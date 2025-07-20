# Project Structure & Organization

## Directory Structure
```
/
├── index.html              # Main entry point and HTML structure
├── README.md               # Project documentation
├── js/                     # JavaScript files
│   ├── cards.js            # Card definitions and card system
│   ├── game.js             # Game logic and state management
│   └── ui.js               # UI interactions and rendering
├── styles/                 # CSS styling files
│   ├── index.css           # Main CSS imports
│   ├── main.css            # Core styling for layout and animations
│   ├── ui.css              # UI component styling
│   ├── cards/              # Card-specific styling
│   ├── factions/           # Faction-specific styling
│   └── ui/                 # UI element styling
└── images/                 # Image assets (if any)
```

## Key Components

### JavaScript Architecture
- **Card System** (`cards.js`): 
  - Base `Card` class with `WarriorCard` and `WeaponCard` subclasses
  - Card collections organized by faction
  - Card rendering and behavior logic

- **Game Logic** (`game.js`):
  - `Game` class manages game state and rules
  - Turn management and combat resolution
  - Player and opponent actions

- **UI Management** (`ui.js`):
  - DOM manipulation and event handling
  - Card interaction logic
  - Animation triggers

### CSS Organization
- **Component-Based**: CSS is organized by component type
- **Faction-Specific Styling**: Each faction has its own styling for cards
- **Animation System**: CSS animations for game interactions

## Data Flow
1. Game state is managed in the `Game` class
2. UI events trigger game state changes
3. Game state updates trigger UI rendering
4. Card interactions follow event-driven patterns

## Naming Conventions
- **Files**: Lowercase with descriptive names
- **CSS Classes**: Kebab-case (e.g., `card-container`)
- **JavaScript**: 
  - Classes: PascalCase (e.g., `WarriorCard`)
  - Variables/Functions: camelCase (e.g., `playerHand`)
  - Constants: UPPER_SNAKE_CASE (e.g., `CARD_TYPES`)

## Extension Points
- Add new card types by extending the base `Card` class
- Add new factions by creating faction-specific card collections
- Extend game mechanics in the `Game` class
- Add new UI components in the appropriate CSS files