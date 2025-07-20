// Game logic for Sikh Warriors deck building game

class Game {
    constructor(playerFaction = 'sikh', opponentFaction = 'british') {
        this.playerDeck = [];
        this.playerHand = [];
        this.playerField = [];
        this.playerDiscard = [];

        this.opponentField = [];
        this.opponentDiscard = [];

        this.energy = 5;
        this.maxEnergy = 5;

        // Also track opponent energy
        this.opponentEnergy = 5;
        this.opponentMaxEnergy = 5;

        this.selectedCard = null;
        this.targetCard = null;

        // Combat and scoring system
        this.playerScore = 0;
        this.opponentScore = 0;

        // Turn system
        this.currentTurn = 1;
        this.maxTurns = 10;

        // Faction settings
        this.playerFaction = playerFaction;
        this.opponentFaction = opponentFaction;

        // Game state
        this.gameStarted = false;
    }

    initGame() {
        // Set the appropriate starter deck based on faction
        let starterDeck;
        switch (this.playerFaction) {
            case 'sikh':
                starterDeck = SIKH_STARTER_DECK;
                break;
            case 'british':
                starterDeck = BRITISH_STARTER_DECK;
                break;
            case 'mughal':
                starterDeck = MUGHAL_STARTER_DECK;
                break;
            default:
                starterDeck = SIKH_STARTER_DECK;
        }

        // Create a copy of the starter deck
        this.playerDeck = starterDeck.map(card => {
            if (card.type === CARD_TYPES.WARRIOR) {
                return new WarriorCard(card.id, card.name, card.description, card.cost, card.power);
            } else if (card.type === CARD_TYPES.WEAPON) {
                return new WeaponCard(card.id, card.name, card.description, card.cost, card.bonus);
            }
            return null;
        }).filter(card => card !== null);

        this.shuffleDeck();
        this.drawInitialHand();
        this.updateGameState();

        // Mark game as started
        this.gameStarted = true;

        // Hide the faction selection screen and show the game
        document.getElementById('faction-selection').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
    }

    shuffleDeck() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.playerDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.playerDeck[i], this.playerDeck[j]] = [this.playerDeck[j], this.playerDeck[i]];
        }
    }

    drawCard() {
        if (this.playerDeck.length === 0) {
            // Reshuffle discard pile into deck if deck is empty
            this.playerDeck = [...this.playerDiscard];
            this.playerDiscard = [];
            this.shuffleDeck();

            if (this.playerDeck.length === 0) {
                console.log("No cards left to draw!");
                return null;
            }
        }

        const card = this.playerDeck.pop();
        this.playerHand.push(card);
        return card;
    }

    drawInitialHand() {
        for (let i = 0; i < 5; i++) {
            this.drawCard();
        }
    }

    playCard(cardIndex, targetIndex = null) {
        if (cardIndex < 0 || cardIndex >= this.playerHand.length) {
            console.log("Invalid card index");
            return false;
        }

        const card = this.playerHand[cardIndex];

        // Check if we have enough energy
        if (this.energy < card.cost) {
            console.log("Not enough energy to play this card");
            return false;
        }

        // Get the card element before removing it from hand
        const handElement = document.getElementById('player-hand');
        const cardElements = handElement.querySelectorAll('.card');
        const cardElement = cardElements[cardIndex];

        let playSuccess = false;

        // Handle different card types
        if (card.type === CARD_TYPES.WARRIOR) {
            playSuccess = card.play(this);
            if (playSuccess) {
                // Add animation to the card being played
                if (cardElement) {
                    cardElement.classList.add('card-flipping');
                }

                // Animate energy decrease
                const energyElement = document.getElementById('energy');
                energyElement.classList.add('energy-refreshing');

                // Add the card to the field
                this.playerField.push(card);

                // Remove the card from hand
                this.playerHand.splice(cardIndex, 1);

                // Update the game state
                this.updateGameState();

                // Find the newly added card in field and animate it
                setTimeout(() => {
                    const fieldElement = document.getElementById('player-field');
                    const fieldCards = fieldElement.querySelectorAll('.card');
                    const newFieldCard = fieldCards[fieldCards.length - 1];

                    if (newFieldCard) {
                        newFieldCard.classList.add('card-entering');

                        // Remove animation classes after animation completes
                        setTimeout(() => {
                            energyElement.classList.remove('energy-refreshing');
                            newFieldCard.classList.remove('card-entering');
                        }, 800);
                    }
                }, 300);

                return true;
            }
        } else if (card.type === CARD_TYPES.WEAPON) {
            // Weapons need a target warrior
            if (targetIndex !== null && targetIndex >= 0 && targetIndex < this.playerField.length) {
                const target = this.playerField[targetIndex];
                if (target.type === CARD_TYPES.WARRIOR) {
                    playSuccess = card.play(this, target);
                    if (playSuccess) {
                        // Add animation to the weapon card being played
                        if (cardElement) {
                            cardElement.classList.add('card-flipping');
                        }

                        // Animate energy decrease
                        const energyElement = document.getElementById('energy');
                        energyElement.classList.add('energy-refreshing');

                        // Get the target warrior card element
                        const fieldElement = document.getElementById('player-field');
                        const fieldCards = fieldElement.querySelectorAll('.card');
                        const targetElement = fieldCards[targetIndex];

                        // Animate the target warrior
                        if (targetElement) {
                            targetElement.classList.add('combat-active');

                            // Remove animation after a delay
                            setTimeout(() => {
                                targetElement.classList.remove('combat-active');
                            }, 1000);
                        }

                        // Add the weapon to discard
                        this.playerDiscard.push(card);

                        // Remove the card from hand
                        this.playerHand.splice(cardIndex, 1);

                        // Update the game state
                        this.updateGameState();

                        // Remove energy animation after a delay
                        setTimeout(() => {
                            energyElement.classList.remove('energy-refreshing');
                        }, 800);

                        return true;
                    }
                } else {
                    console.log("Weapons can only target warriors");
                    return false;
                }
            } else {
                console.log("Weapon needs a valid warrior target");
                return false;
            }
        }

        return false;
    }

    discardCard(cardIndex) {
        if (cardIndex < 0 || cardIndex >= this.playerHand.length) {
            return false;
        }

        const card = this.playerHand.splice(cardIndex, 1)[0];
        this.playerDiscard.push(card);
        this.updateGameState();
        return true;
    }

    endTurn() {
        // Disable the end turn button during animations
        document.getElementById('end-turn').disabled = true;

        // Add animation to the end turn button
        document.getElementById('end-turn').classList.add('card-flipping');

        // Step 1: Resolve combat with animations
        setTimeout(() => {
            this.resolveCombat();

            // Step 2: Discard hand with animations
            setTimeout(() => {
                // Animate discarding cards
                const handElement = document.getElementById('player-hand');
                const handCards = handElement.querySelectorAll('.card');

                handCards.forEach((card, index) => {
                    card.classList.add('card-removing');
                });

                setTimeout(() => {
                    // Actually discard the cards
                    this.playerDiscard.push(...this.playerHand);
                    this.playerHand = [];

                    // Step 3: Reset energy with animation
                    setTimeout(() => {
                        const energyElement = document.getElementById('energy');
                        energyElement.classList.add('energy-refreshing');

                        this.energy = this.maxEnergy;

                        // Step 4: Draw new hand with animations
                        setTimeout(() => {
                            this.drawInitialHand();

                            // Animate new cards
                            const newHandCards = document.getElementById('player-hand').querySelectorAll('.card');
                            newHandCards.forEach(card => {
                                card.classList.add('card-entering');
                            });

                            // Step 5: Increment turn counter with animation
                            setTimeout(() => {
                                const turnElement = document.getElementById('current-turn');
                                turnElement.classList.add('turn-changing');

                                this.currentTurn++;

                                // Check if game should end due to turn limit
                                if (this.currentTurn > this.maxTurns) {
                                    this.endGame();
                                    return;
                                }

                                // Step 6: Opponent's turn
                                setTimeout(() => {
                                    // Simple AI for opponent
                                    this.simulateOpponentTurn();

                                    // Update game state and re-enable button
                                    this.updateGameState();

                                    // Remove all animation classes
                                    document.getElementById('end-turn').classList.remove('card-flipping');
                                    document.getElementById('energy').classList.remove('energy-refreshing');
                                    document.getElementById('current-turn').classList.remove('turn-changing');

                                    // Re-enable the end turn button
                                    document.getElementById('end-turn').disabled = false;
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
            }, 1000);
        }, 500);
    }

    resolveCombat() {
        // Calculate total power on each side
        let playerPower = this.calculateTotalPower(this.playerField);
        let opponentPower = this.calculateTotalPower(this.opponentField);

        // Add combat flash animation to all cards in both fields
        const playerFieldElement = document.getElementById('player-field');
        const opponentFieldElement = document.getElementById('opponent-field');

        const playerCards = playerFieldElement.querySelectorAll('.card');
        const opponentCards = opponentFieldElement.querySelectorAll('.card');

        // Add combat animation to all cards
        playerCards.forEach(card => card.classList.add('combat-active'));
        opponentCards.forEach(card => card.classList.add('combat-active'));

        // Add power changing animation to power indicators
        const playerPowerIndicator = document.querySelector('.middle-area .power-indicator');
        const opponentPowerIndicator = document.querySelector('.opponent-area .power-indicator');

        playerPowerIndicator.classList.add('power-changing');
        opponentPowerIndicator.classList.add('power-changing');

        // Determine winner of this combat round
        if (playerPower > opponentPower) {
            // Player wins combat
            const scoreIncrease = playerPower - opponentPower;
            this.playerScore += scoreIncrease;

            // Animate score increase
            const playerScoreElement = document.getElementById('player-score');
            playerScoreElement.classList.add('score-increasing');

            // Remove some opponent cards (weakest first)
            if (this.opponentField.length > 0) {
                this.opponentField.sort((a, b) => a.power - b.power);

                // Add shake animation to the weakest card before removing
                if (opponentCards.length > 0) {
                    const weakestCard = opponentCards[0];
                    weakestCard.classList.add('card-shaking');
                }

                const defeatedCard = this.opponentField.shift();
                this.opponentDiscard.push(defeatedCard);
            }
        } else if (opponentPower > playerPower) {
            // Opponent wins combat
            const scoreIncrease = opponentPower - playerPower;
            this.opponentScore += scoreIncrease;

            // Animate score increase
            const opponentScoreElement = document.getElementById('opponent-score');
            opponentScoreElement.classList.add('score-increasing');

            // Remove some player cards (weakest first)
            if (this.playerField.length > 0) {
                this.playerField.sort((a, b) => a.power - b.power);

                // Add shake animation to the weakest card before removing
                if (playerCards.length > 0) {
                    const weakestCard = playerCards[0];
                    weakestCard.classList.add('card-shaking');
                }

                const defeatedCard = this.playerField.shift();
                this.playerDiscard.push(defeatedCard);
            }
        }
        // If equal, nothing happens

        // Remove animation classes after a delay
        setTimeout(() => {
            playerCards.forEach(card => card.classList.remove('combat-active'));
            opponentCards.forEach(card => card.classList.remove('combat-active'));
            playerPowerIndicator.classList.remove('power-changing');
            opponentPowerIndicator.classList.remove('power-changing');

            const playerScoreElement = document.getElementById('player-score');
            const opponentScoreElement = document.getElementById('opponent-score');
            playerScoreElement.classList.remove('score-increasing');
            opponentScoreElement.classList.remove('score-increasing');
        }, 1500);
    }

    calculateTotalPower(field) {
        return field.reduce((total, card) => {
            // If the card is a warrior with equipped weapons, use getTotalPower
            if (card.type === CARD_TYPES.WARRIOR && card.getTotalPower) {
                return total + card.getTotalPower();
            }
            // Otherwise just use the power value
            return total + (card.power || 0);
        }, 0);
    }

    // Recall a card from the field back to hand
    recallCard(fieldIndex) {
        if (fieldIndex < 0 || fieldIndex >= this.playerField.length) {
            console.log("Invalid field index");
            return false;
        }

        const card = this.playerField[fieldIndex];

        // Get the card element before removing it from the field
        const fieldElement = document.getElementById('player-field');
        const cardElements = fieldElement.querySelectorAll('.card');
        const cardElement = cardElements[fieldIndex];

        if (cardElement) {
            // Add animation to the card being recalled
            cardElement.classList.add('card-flipping');

            // Animate energy refund
            setTimeout(() => {
                const energyElement = document.getElementById('energy');
                energyElement.classList.add('energy-refreshing');

                // Refund energy for the recalled card
                this.energy += card.cost;

                // Make sure energy doesn't exceed maximum
                if (this.energy > this.maxEnergy) {
                    this.energy = this.maxEnergy;
                }

                // If it's a warrior with equipped weapons, move the weapons to discard
                if (card.type === CARD_TYPES.WARRIOR && card.equippedWeapons && card.equippedWeapons.length > 0) {
                    // Move equipped weapons to discard pile
                    this.playerDiscard.push(...card.equippedWeapons);

                    // Clear the equipped weapons array
                    card.equippedWeapons = [];
                }

                // Remove the card from the field
                this.playerField.splice(fieldIndex, 1);

                // Add the card back to hand
                this.playerHand.push(card);

                // Update the game state
                this.updateGameState();

                // Find the newly added card in hand and animate it
                setTimeout(() => {
                    const handElement = document.getElementById('player-hand');
                    const handCards = handElement.querySelectorAll('.card');
                    const newHandCard = handCards[handCards.length - 1];

                    if (newHandCard) {
                        newHandCard.classList.add('card-entering');

                        // Remove animation classes after animation completes
                        setTimeout(() => {
                            energyElement.classList.remove('energy-refreshing');
                            newHandCard.classList.remove('card-entering');
                        }, 800);
                    }
                }, 300);
            }, 500);

            return true;
        }

        // If we couldn't find the card element, just update without animation
        // Refund energy for the recalled card
        this.energy += card.cost;

        // Make sure energy doesn't exceed maximum
        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }

        // If it's a warrior with equipped weapons, move the weapons to discard
        if (card.type === CARD_TYPES.WARRIOR && card.equippedWeapons && card.equippedWeapons.length > 0) {
            // Move equipped weapons to discard pile
            this.playerDiscard.push(...card.equippedWeapons);

            // Clear the equipped weapons array
            card.equippedWeapons = [];
        }

        // Remove the card from the field
        this.playerField.splice(fieldIndex, 1);

        // Add the card back to hand
        this.playerHand.push(card);

        this.updateGameState();
        return true;
    }

    endGame() {
        // Determine final winner
        let winner = "No one";
        if (this.playerScore > this.opponentScore) {
            winner = "Player";
        } else if (this.opponentScore > this.playerScore) {
            winner = "Opponent";
        } else {
            winner = "It's a tie";
        }

        // Display game over message
        alert(`Game Over! ${winner} wins!\nFinal Score - Player: ${this.playerScore} | Opponent: ${this.opponentScore}`);

        // Disable controls
        document.getElementById('end-turn').disabled = true;
    }

    simulateOpponentTurn() {
        // Simple opponent AI - just for demonstration
        // In a real game, this would be more complex

        // Reset opponent energy at the start of their turn
        this.opponentEnergy = this.opponentMaxEnergy;

        // Update UI first to show current state
        this.updateGameState();

        // Randomly add 1-2 cards to opponent field with animation
        const numCards = Math.floor(Math.random() * 2) + 1;
        let cardsAdded = 0;

        // Function to add a card with animation
        const addCardWithAnimation = () => {
            // Get a random warrior card from the opponent's faction
            const cardCopy = getRandomCardFromFaction(this.opponentFaction, CARD_TYPES.WARRIOR);

            if (cardCopy && cardCopy.cost <= this.opponentEnergy) {
                // Deduct energy cost
                this.opponentEnergy -= cardCopy.cost;
                this.opponentField.push(cardCopy);

                // Update UI to show the new card
                this.updateGameState();

                // Add animation to the newly added card
                const opponentFieldElement = document.getElementById('opponent-field');
                const cards = opponentFieldElement.querySelectorAll('.card');
                const newCard = cards[cards.length - 1];

                if (newCard) {
                    newCard.classList.add('card-entering');

                    // Remove animation class after animation completes
                    setTimeout(() => {
                        newCard.classList.remove('card-entering');
                    }, 800);
                }

                console.log(`Opponent played ${cardCopy.name} (Cost: ${cardCopy.cost}, Remaining Energy: ${this.opponentEnergy})`);

                // Continue adding cards if needed
                cardsAdded++;
                if (cardsAdded < numCards) {
                    setTimeout(addCardWithAnimation, 600);
                }
            } else {
                // If we couldn't get a suitable card, try again with a lower cost card
                // or stop if we've tried too many times
                if (cardsAdded < numCards) {
                    setTimeout(addCardWithAnimation, 100);
                }
            }
        };

        // Start adding cards with animation
        if (numCards > 0) {
            addCardWithAnimation();
        }
    }

    updateGameState() {
        // Update UI elements with current game state
        document.getElementById('energy').textContent = this.energy;
        document.getElementById('max-energy').textContent = this.maxEnergy;
        document.getElementById('deck-count').textContent = this.playerDeck.length;
        document.getElementById('discard-count').textContent = this.playerDiscard.length;

        // Update score and turn information
        document.getElementById('player-score').textContent = this.playerScore;
        document.getElementById('opponent-score').textContent = this.opponentScore;
        document.getElementById('current-turn').textContent = this.currentTurn;
        document.getElementById('max-turns').textContent = this.maxTurns;

        // Update UI with cards
        updateUI(this);
    }

    resetGame(forceQuit = false) {
        this.playerDeck = [];
        this.playerHand = [];
        this.playerField = [];
        this.playerDiscard = [];
        this.opponentField = [];
        this.opponentDiscard = [];

        this.energy = 5;
        this.maxEnergy = 5;

        // Reset opponent energy
        this.opponentEnergy = 5;
        this.opponentMaxEnergy = 5;

        this.selectedCard = null;
        this.targetCard = null;

        // Reset combat and scoring system
        this.playerScore = 0;
        this.opponentScore = 0;

        // Reset turn system
        this.currentTurn = 1;

        // Re-enable controls
        const endTurnButton = document.getElementById('end-turn');
        if (endTurnButton) {
            endTurnButton.disabled = false;
        }

        // If quitting to main menu or game wasn't started yet
        if (forceQuit || !this.gameStarted) {
            // Reset game started flag
            this.gameStarted = false;

            // Show the faction selection screen
            document.getElementById('faction-selection').classList.remove('hidden');
            document.getElementById('game-container').classList.add('hidden');

            // Hide any open deck previews
            document.querySelectorAll('.deck-preview').forEach(preview => {
                preview.classList.add('hidden');
                preview.style.display = 'none';
            });
        } else {
            // Otherwise, just reinitialize with the same factions
            this.initGame();
        }
    }

    // Method to change player faction
    setPlayerFaction(faction) {
        this.playerFaction = faction;

        // Update the faction selection UI
        document.querySelectorAll('.faction-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.getElementById(`faction-${faction}`).classList.add('selected');
    }

    // Method to change opponent faction
    setOpponentFaction(faction) {
        this.opponentFaction = faction;

        // Update the faction selection UI
        document.querySelectorAll('.opponent-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.getElementById(`opponent-${faction}`).classList.add('selected');
    }

    // Method to start the game with selected factions
    startGame() {
        this.initGame();
    }

    // Method to show deck preview for a faction
    showDeckPreview(faction) {
        // Show the appropriate deck preview
        document.querySelectorAll('.deck-preview').forEach(preview => {
            preview.classList.add('hidden');
            preview.style.display = 'none';
        });

        const previewElement = document.getElementById(`${faction}-deck-preview`);
        if (previewElement) {
            previewElement.classList.remove('hidden');
            previewElement.style.display = 'block';
            this.generateDeckPreviewCards(faction);
        }
    }

    // Method to generate preview cards for a faction's deck
    generateDeckPreviewCards(faction) {
        let factionCards;

        // Get the appropriate faction cards
        switch (faction) {
            case 'sikh':
                factionCards = SIKH_CARDS;
                break;
            case 'british':
                factionCards = BRITISH_CARDS;
                break;
            case 'mughal':
                factionCards = MUGHAL_CARDS;
                break;
            default:
                return;
        }

        // Get the container elements
        const warriorsContainer = document.getElementById(`${faction}-warriors`);
        const weaponsContainer = document.getElementById(`${faction}-weapons`);

        // Clear existing content
        if (warriorsContainer) warriorsContainer.innerHTML = '';
        if (weaponsContainer) weaponsContainer.innerHTML = '';

        // Create card elements for each card in the faction
        Object.values(factionCards).forEach(card => {
            // Create a preview card element
            const cardElement = document.createElement('div');
            cardElement.className = `preview-card ${card.type}-card`;

            // Get the stylized image
            const imageContent = card.getStylizedImage();

            // Set the card content
            cardElement.innerHTML = `
                <div class="card-title">${card.name}</div>
                <div class="card-image">${imageContent}</div>
                <div class="card-type">${card.type.charAt(0).toUpperCase() + card.type.slice(1)}</div>
                <div class="card-description">${card.description}</div>
                <div class="card-stats">
                    <span>Cost: ${card.cost}</span>
                    ${card.power !== undefined ? `<span>Power: ${card.power}</span>` : ''}
                    ${card.bonus !== undefined ? `<span>Bonus: +${card.bonus}</span>` : ''}
                </div>
            `;

            // Add the card to the appropriate container
            if (card.type === CARD_TYPES.WARRIOR && warriorsContainer) {
                warriorsContainer.appendChild(cardElement);
            } else if (card.type === CARD_TYPES.WEAPON && weaponsContainer) {
                weaponsContainer.appendChild(cardElement);
            }
        });
    }
}

// Initialize game when the page loads
let gameInstance;

// Function to reset the UI state
function resetUIState() {
    // Hide all deck previews
    document.querySelectorAll('.deck-preview').forEach(preview => {
        preview.classList.add('hidden');
        preview.style.display = 'none';
    });

    // Show faction selection screen
    document.getElementById('faction-selection').classList.remove('hidden');
    document.getElementById('faction-selection').style.display = 'block';

    // Hide game container
    document.getElementById('game-container').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    // Create the game instance but don't start it yet
    gameInstance = new Game();

    // Reset the UI state
    resetUIState();

    // Set up event listeners for the game
    document.getElementById('end-turn').addEventListener('click', () => {
        gameInstance.endTurn();
    });

    document.getElementById('quit-game').addEventListener('click', () => {
        // Show confirmation dialog
        if (confirm('Are you sure you want to quit the current game?')) {
            // Hide game container and show faction selection
            document.getElementById('game-container').classList.add('hidden');
            document.getElementById('faction-selection').classList.remove('hidden');

            // Reset the game
            gameInstance.resetGame(true);
        }
    });

    // Set up event listeners for faction selection
    document.querySelectorAll('.faction-option').forEach(option => {
        option.addEventListener('click', () => {
            const faction = option.getAttribute('data-faction');
            gameInstance.setPlayerFaction(faction);
        });
    });

    document.querySelectorAll('.opponent-option').forEach(option => {
        option.addEventListener('click', () => {
            const faction = option.getAttribute('data-faction');
            gameInstance.setOpponentFaction(faction);
        });
    });

    // Set up event listeners for view deck buttons
    document.querySelectorAll('.view-deck-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the faction selection
            const faction = button.getAttribute('data-faction');
            gameInstance.showDeckPreview(faction);
        });
    });

    // Set up event listeners for closing deck previews
    document.querySelectorAll('.close-preview').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.querySelectorAll('.deck-preview').forEach(preview => {
                preview.classList.add('hidden');
                preview.style.display = 'none';
            });
        });
    });

    // Close deck preview when clicking outside the content
    document.querySelectorAll('.deck-preview').forEach(preview => {
        preview.addEventListener('click', (e) => {
            if (e.target === preview) {
                preview.classList.add('hidden');
                preview.style.display = 'none';
            }
        });
    });

    document.getElementById('start-game').addEventListener('click', () => {
        gameInstance.startGame();
    });

    // Initially hide the game container and show faction selection
    document.getElementById('game-container').classList.add('hidden');
    const factionSelection = document.getElementById('faction-selection');
    factionSelection.classList.remove('hidden');
    console.log('Faction selection visibility:', !factionSelection.classList.contains('hidden'));
});