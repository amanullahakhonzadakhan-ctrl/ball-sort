# 🧪 Glass Sort - Premium Ball Sort Puzzle Game

A visually stunning ball sort puzzle game featuring modern glassmorphism UI, smooth animations, and engaging gameplay mechanics.

## ✨ Features

- **🎨 Glassmorphism UI**: Beautiful frosted glass effects with blur and transparency
- **🎲 Dynamic Level Generation**: Advanced algorithm generates 5,000+ unique, solvable levels
- **🎯 Progressive Difficulty**: Scales from beginner (2 colors) to expert (14 colors)
- **♾️ Infinite Gameplay**: Levels generated on-demand using reverse-generation method
- **🛒 In-Game Store**: Buy color packs and emoji packs with coins
- **💰 Coin System**: Earn coins by completing levels and watching ads
- **🎨 Color Packs**: 4 packs with unique color schemes (100-300 coins)
- **😊 Emoji Packs**: 5 themed emoji packs (150-350 coins)
- **📺 Reward Ads**: Watch 5-second simulated ads to earn +50 coins
- **🎵 Sound System**: Interactive sound effects for moves, wins, and errors
- **🎶 Background Music**: Continuous looping music with independent volume control
- **🌓 Theme Support**: Dark and light theme options
- **↩️ Undo Functionality**: Take back moves when needed
- **📊 Progress Tracking**: Automatic save system using localStorage
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile
- **⌨️ Keyboard Shortcuts**: Quick actions for power users
- **🎉 Celebration Animations**: Confetti and toast notifications

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser!

### Installation

1. Open the project folder:
   ```
   cd glass-sort-game
   ```

2. Open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click and select "Open with Browser", or
   - Use a local server (optional):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. Start playing! 🎮

## 🎮 How to Play

1. **Select a tube** by clicking on it (must contain balls)
2. **Click another tube** to move the top ball
3. **Rules:**
   - Can only move to empty tubes or tubes with matching top color
   - Tubes can hold maximum 4 balls
   - Complete when all tubes contain balls of a single color
4. **Complete the level** to unlock the next one
5. **Watch optional ads** for bonus coins! 💰

## 🎯 Game Controls

### Mouse Controls
- **Left Click**: Select/move balls
- **Store Button** (🛒): Open in-game store
- **Restart Button** (🔄): Restart current level
- **Undo Button** (↩️): Undo last move
- **Settings** (⚙️): Access game settings
- **Levels** (🔢): Jump to any unlocked level

### Keyboard Shortcuts
- **Ctrl/Cmd + Z**: Undo last move
- **Ctrl/Cmd + R**: Restart level
- **Escape**: Close modals
- **U**: Quick undo

## 🛒 Store System

The game features a complete in-game economy:
- **Earn Coins**: Complete levels and watch reward ads
- **Buy Packs**: Purchase color and emoji packs (100-350 coins)
- **Watch Ads**: Earn +50 coins per 5-second ad
- **Customize**: Unlock new ball designs and colors

📖 **For complete store details, see [STORE_GUIDE.md](STORE_GUIDE.md)**

## 🎲 Level Generation System

The game features an **advanced algorithm that generates 5,000+ solvable levels**:
- **Reverse Generation Method**: Start with solved state, shuffle backward
- **100% Solvable**: Every level guaranteed to have solution
- **Progressive Difficulty**: Automatically scales from 2 to 14 colors
- **On-Demand Generation**: Levels created as you play
- **Smart Caching**: First 100 levels pre-generated for performance

### Difficulty Progression
- **Levels 1-50**: Beginner (2-3 colors, 5-15 moves)
- **Levels 51-200**: Easy (4-5 colors, 15-30 moves)
- **Levels 201-500**: Medium (6-7 colors, 30-50 moves)
- **Levels 501-1000**: Hard (8-9 colors, 50-80 moves)
- **Levels 1001-2000**: Very Hard (10-12 colors, 80-120 moves)
- **Levels 2001-5000**: Expert (12-14 colors, 120-250 moves)

📖 **For complete algorithm details, see [LEVEL_GENERATION_GUIDE.md](LEVEL_GENERATION_GUIDE.md)**

## 📁 Project Structure

```
glass-sort-game/
│
├── index.html              # Main HTML file
├── style.css              # All styling and animations
│
├── js/
│   ├── main.js            # Core game logic & state management
│   ├── ui.js              # DOM manipulation & UI updates
│   ├── levelGenerator.js  # Advanced level generation algorithm
│   ├── levels.js          # Static levels & generation integration
│   └── settings.js        # Settings & localStorage management
│
├── assets/
│   ├── images/            # Game images (logo, icons, etc.)
│   └── sounds/            # Sound effects (optional)
│
└── README.md              # This file
```

## 🔊 Audio System

### 🎶 Background Music ✅ INCLUDED
- **background.mp3**: Continuous looping background music during gameplay
- Volume: 30% (lower than sound effects)
- Toggle: Independent control in Settings (Music toggle)
- Auto-loops seamlessly

### 🎵 Sound Effects
Add the following MP3 files to `assets/sounds/`:

- **move.mp3**: Ball movement sound ✅ INCLUDED
- **click.mp3**: UI button click
- **win.mp3**: Level completion celebration
- **error.mp3**: Invalid move feedback

The game works perfectly without sounds - they're optional enhancements!

### Recommended Sound Sources:
- [Freesound.org](https://freesound.org/)
- [Zapsplat.com](https://www.zapsplat.com/)
- [Mixkit.co](https://mixkit.co/free-sound-effects/)

## 🎨 Customization

### Adding More Levels

Edit `js/levels.js` and add new level configurations:

```javascript
16: {
    tubes: [
        ['red', 'blue', 'green', 'yellow'],
        ['purple', 'orange', 'red', 'blue'],
        // ... more tubes
        [],  // Empty tubes
        []
    ]
}
```

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --ball-custom: radial-gradient(circle at 30% 30%, #color1, #color2);
}
```

Then add the color name to your level configuration.

### Adjusting Difficulty

- **Fewer empty tubes** = Harder
- **More colors** = Harder
- **Mixed ball order** = Harder

## 🐛 Debug Console

Access debug features in browser console:

### Game State & Progress
```javascript
// View current game state
window.gameDebug.getState()

// Add coins
window.gameDebug.addCoins(100)

// Jump to specific level
window.gameDebug.loadLevel(5)

// Reset all progress
window.gameDebug.resetProgress()

// Export game state
window.gameDebug.exportState()
```

### Level Generation Tools
```javascript
// Generate custom number of levels
window.gameDebug.generateLevels(100)

// Pre-generate next batch of levels
window.gameDebug.preGenerateNextBatch(50)

// Get statistics for current or specific level
window.gameDebug.getLevelStats()
window.gameDebug.getLevelStats(250)

// Export all generated levels as JSON
window.gameDebug.exportGeneratedLevels()

// Clear level cache and regenerate
window.gameDebug.clearLevelCache()
```

## 💾 Data Storage

The game uses browser localStorage to save:
- Current level progress
- Completed levels
- Coin balance
- User settings (sound, theme)
- Total moves statistics

Data persists between sessions automatically.

## 🎯 Features Breakdown

### State Management
- Automatic save/load system
- Move history for undo functionality
- Real-time validation

### UI/UX
- Smooth CSS animations
- Haptic feedback through animations
- Responsive design for all devices
- Accessible color contrast

### Performance
- No external dependencies
- Optimized animations
- Efficient DOM updates
- Minimal memory footprint

## 🌟 Tips for Players

1. **Plan ahead**: Look for tubes that can be cleared quickly
2. **Use empty tubes wisely**: They're your most valuable resource
3. **Undo is your friend**: Don't be afraid to experiment
4. **Complete tubes early**: Free up space for complex moves
5. **Watch for patterns**: Similar colors often need to be separated first

## 📱 Browser Compatibility

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

## 🔮 Future Enhancements

Potential features for future versions:
- Auto-solve algorithm
- Hint system
- Timed challenges
- Daily puzzles
- Leaderboards
- More themes
- Custom level creator
- Sound effects mixer
- Achievement system

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest new features
- Submit level designs
- Improve documentation

## 📄 License

This project is open source and available for personal and educational use.

## 🎮 Have Fun!

Enjoy playing Glass Sort! Challenge yourself to complete all levels with the minimum number of moves.

---

**Made with ❤️ using vanilla JavaScript, CSS3, and HTML5**

*No frameworks, no dependencies, just pure web technologies!*
