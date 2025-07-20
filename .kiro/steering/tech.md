# Technical Stack & Development Guidelines

## Tech Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build System**: None (direct browser execution)
- **Dependencies**: None (self-contained application)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Code Organization
- **Object-Oriented Approach**: Game uses class-based architecture for cards and game state
- **Event-Driven UI**: UI interactions are handled through event listeners
- **CSS Styling**: Uses custom CSS for styling with no external frameworks

## Development Practices
- **Card System**: Extend the base Card class for new card types
- **Animations**: Use CSS animations for visual feedback
- **Styling**: Use CSS classes for styling rather than inline styles
- **Naming Convention**: camelCase for JavaScript variables and functions

## Running the Application
To run the game locally:
1. Open `index.html` in a web browser
2. No build step or server required

## Testing
- Manual testing through browser gameplay
- Test across different browsers for compatibility

## Adding New Content
### Adding New Cards:
1. Define card in `cards.js` with appropriate properties
2. Create CSS styling for the card in the faction-specific CSS file
3. Add the card to the appropriate faction's card collection
4. Update the starter deck if needed

### Adding New Factions:
1. Create new faction cards in `cards.js`
2. Add faction-specific CSS styling
3. Update the faction selection UI in `index.html`
4. Add the faction to the game initialization logic