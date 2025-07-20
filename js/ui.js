// UI handling for Sikh Warriors deck building game

// Global variables for tracking UI state
let selectedCardElement = null;
let selectedCardIndex = -1;
let targetCardElement = null;
let targetCardIndex = -1;

// Update the UI based on the current game state
function updateUI(gameState) {
    updatePlayerHand(gameState);
    updatePlayerField(gameState);
    updateOpponentField(gameState);
    
    // Update power indicators
    const playerPower = gameState.calculateTotalPower(gameState.playerField);
    const opponentPower = gameState.calculateTotalPower(gameState.opponentField);
    
    document.getElementById('player-power').textContent = playerPower;
    document.getElementById('opponent-power').textContent = opponentPower;
    
    // Highlight who's winning
    const playerPowerIndicator = document.querySelector('.middle-area .power-indicator');
    const opponentPowerIndicator = document.querySelector('.opponent-area .power-indicator');
    
    // Reset classes
    playerPowerIndicator.classList.remove('winning', 'losing', 'tied');
    opponentPowerIndicator.classList.remove('winning', 'losing', 'tied');
    
    // Set appropriate class
    if (playerPower > opponentPower) {
        playerPowerIndicator.classList.add('winning');
        opponentPowerIndicator.classList.add('losing');
    } else if (opponentPower > playerPower) {
        playerPowerIndicator.classList.add('losing');
        opponentPowerIndicator.classList.add('winning');
    } else {
        playerPowerIndicator.classList.add('tied');
        opponentPowerIndicator.classList.add('tied');
    }
}

// Update the player's hand display
function updatePlayerHand(gameState) {
    const handElement = document.getElementById('player-hand');
    handElement.innerHTML = '';
    
    gameState.playerHand.forEach((card, index) => {
        const cardElement = card.createCardElement();
        cardElement.dataset.index = index;
        
        // Add event listeners for card interactions
        cardElement.addEventListener('click', () => handleCardClick(cardElement, index, 'hand'));
        cardElement.addEventListener('mouseover', () => showCardPreview(card));
        cardElement.addEventListener('mouseout', hideCardPreview);
        
        // Disable cards that can't be played due to energy cost
        if (card.cost > gameState.energy) {
            cardElement.classList.add('disabled');
        }
        
        handElement.appendChild(cardElement);
    });
}

// Update the player's field display
function updatePlayerField(gameState) {
    const fieldElement = document.getElementById('player-field');
    fieldElement.innerHTML = '';
    
    gameState.playerField.forEach((card, index) => {
        const cardElement = card.createCardElement();
        cardElement.dataset.index = index;
        
        // Add event listeners for card interactions
        cardElement.addEventListener('click', () => handleCardClick(cardElement, index, 'field'));
        cardElement.addEventListener('mouseover', () => showCardPreview(card));
        cardElement.addEventListener('mouseout', hideCardPreview);
        
        // Add recall button
        const recallButton = document.createElement('div');
        recallButton.className = 'recall-button';
        recallButton.innerHTML = '↩';
        recallButton.title = 'Recall to hand';
        recallButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the card click event
            gameInstance.recallCard(index);
        });
        
        cardElement.appendChild(recallButton);
        fieldElement.appendChild(cardElement);
    });
}

// Update the opponent's field display
function updateOpponentField(gameState) {
    const fieldElement = document.getElementById('opponent-field');
    fieldElement.innerHTML = '';
    
    gameState.opponentField.forEach((card, index) => {
        const cardElement = card.createCardElement();
        cardElement.dataset.index = index;
        
        // Add event listeners for card interactions
        cardElement.addEventListener('mouseover', () => showCardPreview(card));
        cardElement.addEventListener('mouseout', hideCardPreview);
        
        fieldElement.appendChild(cardElement);
    });
}

// Handle card click events
function handleCardClick(cardElement, index, zone) {
    // If clicking on a hand card
    if (zone === 'hand') {
        // Check if we're clicking on the same card that's already selected (to unselect it)
        if (selectedCardElement === cardElement) {
            // Unselect the card
            resetSelection();
            return;
        }
        
        // If a card is already selected, deselect it
        if (selectedCardElement) {
            selectedCardElement.classList.remove('selected');
        }
        
        // Select the new card
        selectedCardElement = cardElement;
        selectedCardIndex = index;
        cardElement.classList.add('selected');
        
        // Check if the card is a weapon that needs a target
        const card = gameInstance.playerHand[index];
        if (card.type === CARD_TYPES.WEAPON) {
            // Highlight valid targets
            highlightValidTargets();
            
            // Add a message to indicate you can click again to unselect
            const handElement = document.getElementById('player-hand');
            const messageElement = document.createElement('div');
            messageElement.className = 'selection-message';
            messageElement.textContent = 'Click the weapon again to unselect';
            handElement.appendChild(messageElement);
        } else {
            // For warriors, just play the card
            if (!cardElement.classList.contains('disabled')) {
                gameInstance.playCard(index);
                resetSelection();
            }
        }
    }
    // If clicking on a field card (potential target for a weapon)
    else if (zone === 'field') {
        // If a hand card is selected and it's a weapon
        if (selectedCardElement && selectedCardIndex !== -1) {
            const card = gameInstance.playerHand[selectedCardIndex];
            if (card.type === CARD_TYPES.WEAPON) {
                // Play the weapon card with this target
                gameInstance.playCard(selectedCardIndex, index);
                resetSelection();
            }
        }
    }
}

// Highlight valid targets for a weapon card
function highlightValidTargets() {
    const fieldElement = document.getElementById('player-field');
    const fieldCards = fieldElement.querySelectorAll('.card');
    
    fieldCards.forEach(card => {
        const index = parseInt(card.dataset.index);
        const targetCard = gameInstance.playerField[index];
        
        if (targetCard.type === CARD_TYPES.WARRIOR) {
            card.classList.add('valid-target');
        }
    });
}

// Reset card selection
function resetSelection() {
    if (selectedCardElement) {
        selectedCardElement.classList.remove('selected');
    }
    
    // Remove highlighting from potential targets
    const fieldElement = document.getElementById('player-field');
    const fieldCards = fieldElement.querySelectorAll('.card');
    fieldCards.forEach(card => {
        card.classList.remove('valid-target');
    });
    
    // Remove any selection message
    const messageElement = document.querySelector('.selection-message');
    if (messageElement) {
        messageElement.remove();
    }
    
    selectedCardElement = null;
    selectedCardIndex = -1;
    targetCardElement = null;
    targetCardIndex = -1;
}

// Show card preview on hover
function showCardPreview(card) {
    const previewElement = document.getElementById('card-preview');
    
    // Get the stylized image
    const imageContent = card.getStylizedImage();
    
    previewElement.innerHTML = `
        <div class="card-title">${card.name}</div>
        <div class="card-image preview-image">${imageContent}</div>
        <div class="card-type">${card.type.charAt(0).toUpperCase() + card.type.slice(1)}</div>
        <div class="card-description">${card.description}</div>
        <div class="card-stats">
            <span>Cost: ${card.cost}</span>
            ${card.power !== undefined ? `<span>Power: ${card.power}</span>` : ''}
            ${card.bonus !== undefined ? `<span>Bonus: +${card.bonus}</span>` : ''}
        </div>
    `;
    
    previewElement.classList.remove('hidden');
    
    // Position the preview next to the cursor
    document.addEventListener('mousemove', positionCardPreview);
}

// Hide card preview
function hideCardPreview() {
    const previewElement = document.getElementById('card-preview');
    previewElement.classList.add('hidden');
    document.removeEventListener('mousemove', positionCardPreview);
}

// Position card preview next to cursor
function positionCardPreview(e) {
    const previewElement = document.getElementById('card-preview');
    const x = e.clientX + 20;
    const y = e.clientY - 100;
    
    previewElement.style.left = `${x}px`;
    previewElement.style.top = `${y}px`;
}// Instructions modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const instructionsButton = document.getElementById('instructions');
    const instructionsModal = document.getElementById('instructions-modal');
    const closeButton = document.querySelector('.close-button');
    
    // Open instructions modal
    instructionsButton.addEventListener('click', () => {
        instructionsModal.classList.remove('hidden');
    });
    
    // Close instructions modal when clicking the close button
    closeButton.addEventListener('click', () => {
        instructionsModal.classList.add('hidden');
    });
    
    // Close instructions modal when clicking outside the modal content
    instructionsModal.addEventListener('click', (e) => {
        if (e.target === instructionsModal) {
            instructionsModal.classList.add('hidden');
        }
    });
    
    // Close instructions modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !instructionsModal.classList.contains('hidden')) {
            instructionsModal.classList.add('hidden');
        }
    });
});