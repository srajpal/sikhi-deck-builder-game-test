// Card definitions for Sikh Warriors deck building game

// Card types
const CARD_TYPES = {
    WARRIOR: 'warrior',
    WEAPON: 'weapon'
};

// Base card class
class Card {
    constructor(id, name, type, description, cost) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.cost = cost;
        this.image = ''; // Placeholder for image path
    }

    play(gameState, target) {
        // Base play method to be overridden
        console.log(`Playing card: ${this.name}`);
        return true;
    }

    createCardElement() {
        const cardEl = document.createElement('div');
        cardEl.className = `card ${this.type}-card`;
        cardEl.dataset.cardId = this.id;
        
        // Create stylized image content based on card ID
        const imageContent = this.getStylizedImage();
        
        cardEl.innerHTML = `
            <div class="card-title">${this.name}</div>
            <div class="card-image">${imageContent}</div>
            <div class="card-type">${this.type.charAt(0).toUpperCase() + this.type.slice(1)}</div>
            <div class="card-description">${this.description}</div>
            <div class="card-stats">
                <span>Cost: ${this.cost}</span>
                ${this.power !== undefined ? `<span>Power: ${this.power}</span>` : ''}
                ${this.bonus !== undefined ? `<span>Bonus: +${this.bonus}</span>` : ''}
            </div>
        `;
        
        return cardEl;
    }
    
    getStylizedImage() {
        // Return stylized HTML representation based on card ID
        switch(this.id) {
            // Sikh Warriors
            case 'nihang':
                return `<div class="stylized-image warrior-image nihang-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="chakkar-1"></div>
                    <div class="chakkar-2"></div>
                </div>`;
            case 'akali_nihang':
                return `<div class="stylized-image warrior-image akali-image">
                    <div class="turban-tall"></div>
                    <div class="face"></div>
                    <div class="beard-long"></div>
                    <div class="chakkar-1"></div>
                    <div class="chakkar-2"></div>
                    <div class="chakkar-3"></div>
                </div>`;
            case 'gatka':
                return `<div class="stylized-image warrior-image gatka-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="stick-1"></div>
                    <div class="stick-2"></div>
                </div>`;
            case 'panj_pyare':
                return `<div class="stylized-image warrior-image panj-pyare-image">
                    <div class="figure-1"></div>
                    <div class="figure-2"></div>
                    <div class="figure-3"></div>
                    <div class="figure-4"></div>
                    <div class="figure-5"></div>
                </div>`;
            case 'cavalry':
                return `<div class="stylized-image warrior-image cavalry-image">
                    <div class="horse"></div>
                    <div class="rider"></div>
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="spear"></div>
                </div>`;
            case 'misaldar':
                return `<div class="stylized-image warrior-image misaldar-image">
                    <div class="turban-royal"></div>
                    <div class="face"></div>
                    <div class="beard-long"></div>
                    <div class="royal-robe"></div>
                    <div class="sword"></div>
                </div>`;
            case 'shaheed':
                return `<div class="stylized-image warrior-image shaheed-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="flag"></div>
                    <div class="sword"></div>
                </div>`;
            case 'akali':
                return `<div class="stylized-image warrior-image akali-warrior-image">
                    <div class="turban-tall"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="chakkar"></div>
                    <div class="sword"></div>
                </div>`;
            case 'gursikh':
                return `<div class="stylized-image warrior-image gursikh-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="kirpan-small"></div>
                </div>`;
                
            // Sikh Weapons
            case 'kirpan':
                return `<div class="stylized-image weapon-image kirpan-image">
                    <div class="handle"></div>
                    <div class="blade"></div>
                </div>`;
            case 'khanda':
                return `<div class="stylized-image weapon-image khanda-image">
                    <div class="center-blade"></div>
                    <div class="circle"></div>
                    <div class="sword-1"></div>
                    <div class="sword-2"></div>
                </div>`;
            case 'chakkar':
                return `<div class="stylized-image weapon-image chakkar-image">
                    <div class="outer-ring"></div>
                    <div class="inner-ring"></div>
                    <div class="edge-1"></div>
                    <div class="edge-2"></div>
                    <div class="edge-3"></div>
                    <div class="edge-4"></div>
                </div>`;
            case 'nagni':
                return `<div class="stylized-image weapon-image nagni-image">
                    <div class="shaft"></div>
                    <div class="blade"></div>
                    <div class="wave-1"></div>
                    <div class="wave-2"></div>
                </div>`;
            case 'shield':
                return `<div class="stylized-image weapon-image shield-image">
                    <div class="shield-body"></div>
                    <div class="shield-center"></div>
                    <div class="shield-decoration-1"></div>
                    <div class="shield-decoration-2"></div>
                </div>`;
            case 'bow':
                return `<div class="stylized-image weapon-image bow-image">
                    <div class="bow-body"></div>
                    <div class="bow-string"></div>
                    <div class="arrow"></div>
                </div>`;
            case 'spear':
                return `<div class="stylized-image weapon-image spear-image">
                    <div class="spear-shaft"></div>
                    <div class="spear-head"></div>
                    <div class="spear-decoration"></div>
                </div>`;
                
            // British Warriors
            case 'rifleman':
                return `<div class="stylized-image british-warrior-image rifleman-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="rifle"></div>
                </div>`;
            case 'officer':
                return `<div class="stylized-image british-warrior-image officer-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="sword"></div>
                </div>`;
            case 'grenadier':
                return `<div class="stylized-image british-warrior-image grenadier-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="grenade"></div>
                </div>`;
            case 'highlander':
                return `<div class="stylized-image british-warrior-image highlander-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="kilt"></div>
                    <div class="legs"></div>
                </div>`;
            case 'dragoon':
                return `<div class="stylized-image british-warrior-image dragoon-image">
                    <div class="horse"></div>
                    <div class="rider"></div>
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="sword"></div>
                </div>`;
            case 'general':
                return `<div class="stylized-image british-warrior-image general-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="sword"></div>
                </div>`;
            case 'guardsman':
                return `<div class="stylized-image british-warrior-image guardsman-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="rifle"></div>
                </div>`;
            case 'sergeant':
                return `<div class="stylized-image british-warrior-image sergeant-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="baton"></div>
                </div>`;
            case 'scout':
                return `<div class="stylized-image british-warrior-image scout-image">
                    <div class="hat"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="rifle"></div>
                </div>`;
                
            // British Weapons
            case 'musket':
                return `<div class="stylized-image british-weapon-image musket-image">
                    <div class="barrel"></div>
                    <div class="stock"></div>
                </div>`;
            case 'saber':
                return `<div class="stylized-image british-weapon-image saber-image">
                    <div class="blade"></div>
                    <div class="handle"></div>
                    <div class="guard"></div>
                </div>`;
            case 'bayonet':
                return `<div class="stylized-image british-weapon-image bayonet-image">
                    <div class="blade"></div>
                    <div class="socket"></div>
                </div>`;
            case 'cannon':
                return `<div class="stylized-image british-weapon-image cannon-image">
                    <div class="barrel"></div>
                    <div class="wheels"></div>
                </div>`;
            case 'pistol':
                return `<div class="stylized-image british-weapon-image pistol-image">
                    <div class="barrel"></div>
                    <div class="handle"></div>
                </div>`;
            case 'rifle':
                return `<div class="stylized-image british-weapon-image rifle-image">
                    <div class="barrel"></div>
                    <div class="stock"></div>
                </div>`;
            case 'lance':
                return `<div class="stylized-image british-weapon-image lance-image">
                    <div class="shaft"></div>
                    <div class="head"></div>
                </div>`;
                
            // Mughal Warriors
            case 'sowar':
                return `<div class="stylized-image mughal-warrior-image sowar-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="body"></div>
                    <div class="sword"></div>
                </div>`;
            case 'mansabdar':
                return `<div class="stylized-image mughal-warrior-image mansabdar-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="robe"></div>
                </div>`;
            case 'piyada':
                return `<div class="stylized-image mughal-warrior-image piyada-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="spear"></div>
                </div>`;
            case 'zamburak':
                return `<div class="stylized-image mughal-warrior-image zamburak-image">
                    <div class="camel"></div>
                    <div class="rider"></div>
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="gun"></div>
                </div>`;
            case 'ahadis':
                return `<div class="stylized-image mughal-warrior-image ahadis-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="body"></div>
                    <div class="sword"></div>
                </div>`;
            case 'subahdar':
                return `<div class="stylized-image mughal-warrior-image subahdar-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="robe"></div>
                </div>`;
            case 'barqandaz':
                return `<div class="stylized-image mughal-warrior-image barqandaz-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="gun"></div>
                </div>`;
            case 'silahdar':
                return `<div class="stylized-image mughal-warrior-image silahdar-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="beard"></div>
                    <div class="body"></div>
                    <div class="weapons"></div>
                </div>`;
            case 'naqib':
                return `<div class="stylized-image mughal-warrior-image naqib-image">
                    <div class="turban"></div>
                    <div class="face"></div>
                    <div class="body"></div>
                    <div class="flag"></div>
                </div>`;
                
            // Mughal Weapons
            case 'talwar':
                return `<div class="stylized-image mughal-weapon-image talwar-image">
                    <div class="blade"></div>
                    <div class="handle"></div>
                    <div class="pommel"></div>
                </div>`;
            case 'katar':
                return `<div class="stylized-image mughal-weapon-image katar-image">
                    <div class="blade"></div>
                    <div class="handle"></div>
                </div>`;
            case 'toradar':
                return `<div class="stylized-image mughal-weapon-image toradar-image">
                    <div class="barrel"></div>
                    <div class="stock"></div>
                </div>`;
            case 'shamshir':
                return `<div class="stylized-image mughal-weapon-image shamshir-image">
                    <div class="blade"></div>
                    <div class="handle"></div>
                    <div class="pommel"></div>
                </div>`;
            case 'dhal':
                return `<div class="stylized-image mughal-weapon-image dhal-image">
                    <div class="shield-body"></div>
                    <div class="shield-center"></div>
                    <div class="shield-decoration"></div>
                </div>`;
            case 'kaman':
                return `<div class="stylized-image mughal-weapon-image kaman-image">
                    <div class="bow-body"></div>
                    <div class="bow-string"></div>
                    <div class="arrow"></div>
                </div>`;
            case 'neza':
                return `<div class="stylized-image mughal-weapon-image neza-image">
                    <div class="shaft"></div>
                    <div class="head"></div>
                    <div class="decoration"></div>
                </div>`;
                
            default:
                return `<div class="stylized-image default-image"></div>`;
        }
    }
}

// Warrior card class
class WarriorCard extends Card {
    constructor(id, name, description, cost, power) {
        super(id, name, CARD_TYPES.WARRIOR, description, cost);
        this.power = power;
        this.equippedWeapons = []; // Track equipped weapons
    }

    play(gameState) {
        if (gameState.energy >= this.cost) {
            gameState.energy -= this.cost;
            return true;
        }
        return false;
    }
    
    // Get total power including equipped weapons
    getTotalPower() {
        let totalPower = this.power;
        this.equippedWeapons.forEach(weapon => {
            totalPower += weapon.bonus;
        });
        return totalPower;
    }
    
    // Override createCardElement to show equipped weapons
    createCardElement() {
        const cardEl = super.createCardElement();
        
        // Add weapon indicators if there are equipped weapons
        if (this.equippedWeapons.length > 0) {
            const statsDiv = cardEl.querySelector('.card-stats');
            const powerSpan = statsDiv.querySelector('span:last-child');
            
            // Update power display to show base + bonus
            if (powerSpan) {
                const totalPower = this.getTotalPower();
                powerSpan.innerHTML = `Power: ${this.power} <span class="power-bonus">(+${totalPower - this.power})</span>`;
            }
            
            // Add weapon indicators
            const weaponsDiv = document.createElement('div');
            weaponsDiv.className = 'equipped-weapons';
            
            this.equippedWeapons.forEach(weapon => {
                const weaponIndicator = document.createElement('div');
                weaponIndicator.className = `weapon-indicator ${weapon.id}-indicator`;
                weaponIndicator.title = weapon.name;
                weaponsDiv.appendChild(weaponIndicator);
            });
            
            cardEl.appendChild(weaponsDiv);
        }
        
        return cardEl;
    }
}

// Weapon card class
class WeaponCard extends Card {
    constructor(id, name, description, cost, bonus) {
        super(id, name, CARD_TYPES.WEAPON, description, cost);
        this.bonus = bonus;
        this.equippedTo = null; // Track which warrior this weapon is equipped to
    }

    play(gameState, targetWarrior) {
        if (gameState.energy >= this.cost && targetWarrior && targetWarrior.type === CARD_TYPES.WARRIOR) {
            gameState.energy -= this.cost;
            
            // Add this weapon to the warrior's equipped weapons
            targetWarrior.equippedWeapons.push(this);
            
            // Track which warrior this weapon is equipped to
            this.equippedTo = targetWarrior;
            
            return true;
        }
        return false;
    }
}

// Card collections for different factions
const SIKH_CARDS = {
    // Warriors
    nihang: new WarriorCard('nihang', 'Nihang Singh', 'Elite Sikh warrior known for bravery and martial skills.', 2, 3),
    akaliNihang: new WarriorCard('akali_nihang', 'Akali Nihang', 'Fearless warrior of the Akali Nihang order.', 3, 4),
    gatka: new WarriorCard('gatka', 'Gatka Master', 'Expert in the Sikh martial art of Gatka.', 1, 2),
    panjPyare: new WarriorCard('panj_pyare', 'Panj Pyare', 'The Five Beloved Ones, first initiated into the Khalsa.', 5, 6),
    cavalry: new WarriorCard('cavalry', 'Sikh Cavalry', 'Mounted warrior skilled in horseback combat.', 4, 5),
    misaldar: new WarriorCard('misaldar', 'Misal Sardar', 'Leader of a Sikh confederacy with strategic command.', 4, 4),
    shaheed: new WarriorCard('shaheed', 'Shaheed Singh', 'Martyr warrior who fights with unwavering devotion.', 3, 3),
    akali: new WarriorCard('akali', 'Akali Warrior', 'Immortal warrior of the Akal Purakh (Timeless Being).', 2, 3),
    gursikh: new WarriorCard('gursikh', 'Gursikh Warrior', 'Devoted follower of the Guru\'s path with strong principles.', 1, 2),
    
    // Weapons
    kirpan: new WeaponCard('kirpan', 'Kirpan', 'Ceremonial sword carried by Sikhs.', 1, 2),
    khanda: new WeaponCard('khanda', 'Khanda', 'Double-edged sword, symbol of divine knowledge.', 2, 3),
    chakkar: new WeaponCard('chakkar', 'Chakkar', 'Throwing weapon used by Sikh warriors.', 1, 1),
    nagni: new WeaponCard('nagni', 'Nagni Barcha', 'Long spear with wavy blade.', 3, 4),
    shield: new WeaponCard('shield', 'Dhal Shield', 'Traditional shield providing protection in battle.', 1, 1),
    bow: new WeaponCard('bow', 'Teer Kaman', 'Bow and arrows for ranged combat.', 2, 2),
    spear: new WeaponCard('spear', 'Bhala', 'Long spear used by Sikh cavalry.', 2, 3)
};

const BRITISH_CARDS = {
    // Warriors
    rifleman: new WarriorCard('rifleman', 'British Rifleman', 'Skilled marksman with advanced rifle training.', 2, 3),
    officer: new WarriorCard('officer', 'British Officer', 'Commanding officer with tactical expertise.', 3, 4),
    grenadier: new WarriorCard('grenadier', 'Grenadier', 'Elite soldier specialized in grenade and assault tactics.', 1, 2),
    highlander: new WarriorCard('highlander', 'Highland Soldier', 'Fierce Scottish warrior in British service.', 5, 6),
    dragoon: new WarriorCard('dragoon', 'Dragoon Cavalry', 'Mounted soldier trained for both horseback and foot combat.', 4, 5),
    general: new WarriorCard('general', 'British General', 'High-ranking commander with strategic brilliance.', 4, 4),
    guardsman: new WarriorCard('guardsman', 'Royal Guardsman', 'Elite soldier of the royal guard with unwavering loyalty.', 3, 3),
    sergeant: new WarriorCard('sergeant', 'Sergeant Major', 'Experienced non-commissioned officer and battlefield leader.', 2, 3),
    scout: new WarriorCard('scout', 'Colonial Scout', 'Expert in reconnaissance and wilderness survival.', 1, 2),
    
    // Weapons
    musket: new WeaponCard('musket', 'Brown Bess Musket', 'Standard-issue flintlock musket of the British Army.', 1, 2),
    saber: new WeaponCard('saber', 'Cavalry Saber', 'Curved sword used by mounted troops.', 2, 3),
    bayonet: new WeaponCard('bayonet', 'Socket Bayonet', 'Blade attachment for muskets in close combat.', 1, 1),
    cannon: new WeaponCard('cannon', 'Field Cannon', 'Mobile artillery piece for battlefield support.', 3, 4),
    pistol: new WeaponCard('pistol', 'Flintlock Pistol', 'Short-range firearm for officers and cavalry.', 1, 1),
    rifle: new WeaponCard('rifle', 'Baker Rifle', 'Accurate long-range firearm for specialized troops.', 2, 2),
    lance: new WeaponCard('lance', 'Cavalry Lance', 'Long spear used by mounted soldiers.', 2, 3)
};

const MUGHAL_CARDS = {
    // Warriors
    sowar: new WarriorCard('sowar', 'Mughal Sowar', 'Elite cavalry soldier of the Mughal army.', 2, 3),
    mansabdar: new WarriorCard('mansabdar', 'Mansabdar', 'Noble military commander with administrative authority.', 3, 4),
    piyada: new WarriorCard('piyada', 'Piyada Infantry', 'Standard foot soldier of the Mughal army.', 1, 2),
    ahadis: new WarriorCard('ahadis', 'Ahadis Guard', 'Elite imperial bodyguards directly serving the emperor.', 5, 6),
    zamburak: new WarriorCard('zamburak', 'Zamburak Rider', 'Camel-mounted soldier with swivel gun.', 4, 5),
    subahdar: new WarriorCard('subahdar', 'Subahdar', 'Provincial governor with military command.', 4, 4),
    barqandaz: new WarriorCard('barqandaz', 'Barqandaz', 'Specialized matchlock gunner of the imperial forces.', 3, 3),
    silahdar: new WarriorCard('silahdar', 'Silahdar', 'Armorer and weapons master with combat expertise.', 2, 3),
    naqib: new WarriorCard('naqib', 'Naqib', 'Standard-bearer and messenger on the battlefield.', 1, 2),
    
    // Weapons
    talwar: new WeaponCard('talwar', 'Talwar', 'Curved sword with distinctive guard and pommel.', 1, 2),
    shamshir: new WeaponCard('shamshir', 'Shamshir', 'Highly curved saber with exceptional cutting ability.', 2, 3),
    katar: new WeaponCard('katar', 'Katar', 'Distinctive push dagger with H-shaped handle.', 1, 1),
    toradar: new WeaponCard('toradar', 'Toradar Rifle', 'Matchlock or flintlock long gun with elaborate decoration.', 3, 4),
    dhal: new WeaponCard('dhal', 'Dhal Shield', 'Round shield made of steel or rhinoceros hide.', 1, 1),
    kaman: new WeaponCard('kaman', 'Kaman', 'Composite bow made of horn, wood, and sinew.', 2, 2),
    neza: new WeaponCard('neza', 'Neza', 'Long spear used by infantry and cavalry.', 2, 3)
};

// Combined cards collection for utility functions
const CARDS = {
    ...SIKH_CARDS,
    ...BRITISH_CARDS,
    ...MUGHAL_CARDS
};

// Starter deck configurations for each faction
const SIKH_STARTER_DECK = [
    SIKH_CARDS.nihang,
    SIKH_CARDS.gatka,
    SIKH_CARDS.cavalry,
    SIKH_CARDS.gursikh,
    SIKH_CARDS.akali,
    SIKH_CARDS.kirpan,
    SIKH_CARDS.shield,
    SIKH_CARDS.bow,
    SIKH_CARDS.spear,
    SIKH_CARDS.chakkar
];

const BRITISH_STARTER_DECK = [
    BRITISH_CARDS.rifleman,
    BRITISH_CARDS.grenadier,
    BRITISH_CARDS.dragoon,
    BRITISH_CARDS.scout,
    BRITISH_CARDS.sergeant,
    BRITISH_CARDS.musket,
    BRITISH_CARDS.pistol,
    BRITISH_CARDS.rifle,
    BRITISH_CARDS.lance,
    BRITISH_CARDS.bayonet
];

const MUGHAL_STARTER_DECK = [
    MUGHAL_CARDS.sowar,
    MUGHAL_CARDS.piyada,
    MUGHAL_CARDS.zamburak,
    MUGHAL_CARDS.naqib,
    MUGHAL_CARDS.silahdar,
    MUGHAL_CARDS.talwar,
    MUGHAL_CARDS.dhal,
    MUGHAL_CARDS.kaman,
    MUGHAL_CARDS.neza,
    MUGHAL_CARDS.katar
];

// Default starter deck (will be replaced by selected faction)
let STARTER_DECK = SIKH_STARTER_DECK;

// Function to get a copy of a card by ID
function getCardById(id) {
    const originalCard = CARDS[id];
    if (!originalCard) return null;
    
    // Create a new instance of the same card type
    if (originalCard.type === CARD_TYPES.WARRIOR) {
        return new WarriorCard(
            originalCard.id,
            originalCard.name,
            originalCard.description,
            originalCard.cost,
            originalCard.power
        );
    } else if (originalCard.type === CARD_TYPES.WEAPON) {
        return new WeaponCard(
            originalCard.id,
            originalCard.name,
            originalCard.description,
            originalCard.cost,
            originalCard.bonus
        );
    }
    
    return null;
}

// Function to get a random card from a specific faction
function getRandomCardFromFaction(faction, type = null) {
    let factionCards;
    
    switch(faction) {
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
            factionCards = SIKH_CARDS;
    }
    
    // Filter by type if specified
    const cardKeys = Object.keys(factionCards).filter(key => 
        type ? factionCards[key].type === type : true
    );
    
    if (cardKeys.length === 0) return null;
    
    const randomKey = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    return getCardById(randomKey);
}