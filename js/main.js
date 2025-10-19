/**
 * MAIN.JS
 * Core game logic and state management for Glass Sort
 */

// Game State
let gameState = {
    level: 1,
    moves: 0,
    tubes: [],
    selectedTubeIndex: null,
    moveHistory: [],
    isAnimating: false
};

/**
 * Initialize the game on page load
 */
function initGame() {
    console.log('🎮 Initializing Glass Sort...');
    
    // Initialize settings and UI
    initSettings();
    initUI();
    
    // Initialize level generation system
    if (typeof initializeLevelGeneration === 'function') {
        initializeLevelGeneration(100); // Pre-generate first 100 levels
    }
    
    // Load saved level or start from level 1
    const savedLevel = getCurrentLevel();
    loadLevel(savedLevel);
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('✅ Game initialized successfully!');
}

/**
 * Load a specific level
 * @param {number} levelNumber - Level number to load
 */
function loadLevel(levelNumber) {
    console.log(`📦 Loading level ${levelNumber}...`);
    
    // Get level data (supports both static and dynamically generated levels)
    const levelData = typeof getLevelDynamic === 'function' 
        ? getLevelDynamic(levelNumber) 
        : getLevel(levelNumber);
    
    if (!levelData) {
        console.error(`Level ${levelNumber} not found!`);
        showErrorMessage(`Level ${levelNumber} does not exist.`);
        return;
    }
    
    // Reset game state
    gameState = {
        level: levelNumber,
        moves: 0,
        tubes: JSON.parse(JSON.stringify(levelData.tubes)), // Deep copy
        selectedTubeIndex: null,
        moveHistory: [],
        isAnimating: false
    };
    
    // Update UI
    renderBoard(gameState.tubes);
    updateLevelNumber(levelNumber);
    updateMoveCount(0);
    
    // Set current level in storage
    setCurrentLevel(levelNumber);
    
    console.log(`✅ Level ${levelNumber} loaded!`);
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Tube click handler
    const gameBoard = document.getElementById('game-board');
    gameBoard.addEventListener('click', (e) => {
        const tubeElement = e.target.closest('.tube');
        if (tubeElement && !gameState.isAnimating) {
            const tubeIndex = parseInt(tubeElement.dataset.tubeIndex);
            handleTubeClick(tubeIndex);
        }
    });
    
    // Restart button
    document.getElementById('restart-btn').addEventListener('click', () => {
        playSound('click');
        loadLevel(gameState.level);
    });
    
    // Undo button
    document.getElementById('undo-btn').addEventListener('click', () => {
        playSound('click');
        undoMove();
    });
    
    // Next level button (in win modal)
    document.getElementById('next-level-btn').addEventListener('click', () => {
        playSound('click');
        hideWinModal();
        const nextLevel = gameState.level + 1;
        if (levelExists(nextLevel)) {
            loadLevel(nextLevel);
        } else {
            alert('🎉 Congratulations! You\'ve completed all levels!');
            loadLevel(1);
        }
    });
    
    // Watch ad button
    document.getElementById('watch-ad-btn').addEventListener('click', () => {
        playSound('click');
        handleRewardAdClick();
    });
    
    // Level selection
    document.getElementById('levels-grid').addEventListener('click', (e) => {
        const levelBtn = e.target.closest('.level-btn');
        if (levelBtn && !levelBtn.classList.contains('locked')) {
            const level = parseInt(levelBtn.dataset.level);
            playSound('click');
            hideLevelsModal();
            loadLevel(level);
        }
    });
    
    // Watch ad from store
    document.getElementById('watch-ad-store-btn').addEventListener('click', () => {
        playSound('click');
        handleStoreAdClick();
    });
}

/**
 * Handle tube click
 * @param {number} clickedIndex - Index of clicked tube
 */
function handleTubeClick(clickedIndex) {
    console.log(`🖱️ Tube ${clickedIndex} clicked`);
    
    // If no tube is selected
    if (gameState.selectedTubeIndex === null) {
        // Can't select an empty tube
        if (gameState.tubes[clickedIndex].length === 0) {
            playSound('error');
            shakeInvalidTube(clickedIndex);
            return;
        }
        
        // Select the tube
        gameState.selectedTubeIndex = clickedIndex;
        selectTube(clickedIndex);
        playSound('click');
        console.log(`✅ Tube ${clickedIndex} selected`);
    } 
    // If a tube is already selected
    else {
        const sourceIndex = gameState.selectedTubeIndex;
        
        // If clicking the same tube, deselect it
        if (sourceIndex === clickedIndex) {
            gameState.selectedTubeIndex = null;
            deselectAllTubes();
            playSound('click');
            console.log(`↩️ Tube ${clickedIndex} deselected`);
            return;
        }
        
        // Try to move the ball
        if (isValidMove(sourceIndex, clickedIndex)) {
            performMove(sourceIndex, clickedIndex);
        } else {
            // Invalid move
            playSound('error');
            shakeInvalidTube(clickedIndex);
            gameState.selectedTubeIndex = null;
            deselectAllTubes();
            console.log(`❌ Invalid move from ${sourceIndex} to ${clickedIndex}`);
        }
    }
}

/**
 * Check if a move is valid
 * @param {number} sourceIndex - Source tube index
 * @param {number} destIndex - Destination tube index
 * @returns {boolean} - True if move is valid
 */
function isValidMove(sourceIndex, destIndex) {
    const sourceTube = gameState.tubes[sourceIndex];
    const destTube = gameState.tubes[destIndex];
    
    // Source must not be empty
    if (sourceTube.length === 0) {
        return false;
    }
    
    // Destination must not be full
    if (destTube.length >= 4) {
        return false;
    }
    
    // If destination is empty, move is valid
    if (destTube.length === 0) {
        return true;
    }
    
    // Top colors must match
    const sourceTopColor = sourceTube[sourceTube.length - 1];
    const destTopColor = destTube[destTube.length - 1];
    
    return sourceTopColor === destTopColor;
}

/**
 * Perform a move
 * @param {number} sourceIndex - Source tube index
 * @param {number} destIndex - Destination tube index
 */
function performMove(sourceIndex, destIndex) {
    console.log(`🔄 Moving ball from tube ${sourceIndex} to ${destIndex}`);
    
    gameState.isAnimating = true;
    
    // Save move to history
    const sourceTube = gameState.tubes[sourceIndex];
    const ball = sourceTube[sourceTube.length - 1];
    
    gameState.moveHistory.push({
        from: sourceIndex,
        to: destIndex,
        ball: ball
    });
    
    // Perform the move with animation
    animateBallMove(sourceIndex, destIndex, () => {
        // Update game state
        const movedBall = gameState.tubes[sourceIndex].pop();
        gameState.tubes[destIndex].push(movedBall);
        
        // Increment move counter
        gameState.moves++;
        updateMoveCount(gameState.moves);
        
        // Re-render the board
        renderBoard(gameState.tubes);
        
        // Play sound
        playSound('move');
        
        // Reset selection
        gameState.selectedTubeIndex = null;
        deselectAllTubes();
        
        gameState.isAnimating = false;
        
        // Check win condition
        if (checkWinCondition()) {
            handleLevelComplete();
        }
        
        console.log(`✅ Move completed. Total moves: ${gameState.moves}`);
    });
}

/**
 * Check if the level is complete
 * @returns {boolean} - True if level is won
 */
function checkWinCondition() {
    for (let tube of gameState.tubes) {
        // Skip empty tubes
        if (tube.length === 0) {
            continue;
        }
        
        // Tube must be full (4 balls)
        if (tube.length !== 4) {
            return false;
        }
        
        // All balls in tube must be the same color
        const firstColor = tube[0];
        for (let ball of tube) {
            if (ball !== firstColor) {
                return false;
            }
        }
    }
    
    return true;
}

/**
 * Handle level completion
 */
function handleLevelComplete() {
    console.log(`🎉 Level ${gameState.level} completed in ${gameState.moves} moves!`);
    
    // Mark level as completed
    markLevelCompleted(gameState.level);
    
    // Add moves to total
    addTotalMoves(gameState.moves);
    
    // Show win modal with delay for effect
    setTimeout(() => {
        celebrateLevelComplete();
        showWinModal(gameState.moves, gameState.level);
    }, 500);
}

/**
 * Undo the last move
 */
function undoMove() {
    if (gameState.moveHistory.length === 0) {
        console.log('❌ No moves to undo');
        playSound('error');
        return;
    }
    
    if (gameState.isAnimating) {
        return;
    }
    
    console.log('↩️ Undoing last move...');
    
    // Get last move
    const lastMove = gameState.moveHistory.pop();
    
    // Reverse the move
    const ball = gameState.tubes[lastMove.to].pop();
    gameState.tubes[lastMove.from].push(ball);
    
    // Decrement move counter
    if (gameState.moves > 0) {
        gameState.moves--;
        updateMoveCount(gameState.moves);
    }
    
    // Re-render board
    renderBoard(gameState.tubes);
    deselectAllTubes();
    
    playSound('click');
    console.log(`✅ Move undone. Total moves: ${gameState.moves}`);
}

/**
 * Handle reward ad click
 */
function handleRewardAdClick() {
    console.log('📺 Loading reward ad...');
    
    hideWinModal();
    
    // Show loading ad overlay with 5-second timer
    showLoadingAd(5, () => {
        // Ad completed - grant reward
        const rewardAmount = 50;
        const newTotal = addCoins(rewardAmount);
        updateCoinsDisplay(newTotal);
        
        console.log(`💰 Reward granted! +${rewardAmount} coins. Total: ${newTotal}`);
        
        // Show reward toast
        showRewardToast(rewardAmount);
        
        // Automatically load next level after short delay
        setTimeout(() => {
            const nextLevel = gameState.level + 1;
            if (levelExists(nextLevel)) {
                loadLevel(nextLevel);
            } else {
                alert('🎉 Congratulations! You\'ve completed all levels!');
                loadLevel(1);
            }
        }, 2000);
    });
}

/**
 * Handle ad click from store
 */
function handleStoreAdClick() {
    console.log('📺 Loading reward ad from store...');
    
    // Show loading ad overlay with 5-second timer
    showLoadingAd(5, () => {
        // Ad completed - grant reward
        const rewardAmount = 50;
        const newTotal = addCoins(rewardAmount);
        updateCoinsDisplay(newTotal);
        
        console.log(`💰 Reward granted! +${rewardAmount} coins. Total: ${newTotal}`);
        
        // Show reward toast
        showRewardToast(rewardAmount);
        
        // Update store UI to reflect new coin balance
        setTimeout(() => {
            updateStoreUI();
        }, 1500);
    });
}

/**
 * Get hint for the player (future feature)
 * @returns {Object|null} - Hint object with from and to indices
 */
function getHint() {
    // Simple hint: find first valid move
    for (let i = 0; i < gameState.tubes.length; i++) {
        if (gameState.tubes[i].length === 0) continue;
        
        for (let j = 0; j < gameState.tubes.length; j++) {
            if (i === j) continue;
            
            if (isValidMove(i, j)) {
                return { from: i, to: j };
            }
        }
    }
    
    return null;
}

/**
 * Check if level is solvable (future feature)
 * @returns {boolean} - True if level is solvable
 */
function isLevelSolvable() {
    // This would require implementing a solving algorithm
    // For now, we assume all levels are solvable
    return true;
}

/**
 * Auto-solve level (debug feature)
 */
function autoSolve() {
    console.log('🤖 Auto-solving level...');
    
    // This would require implementing a solving algorithm
    // For now, just show a message
    alert('Auto-solve feature coming soon!');
}

/**
 * Export game state for debugging
 * @returns {Object} - Current game state
 */
function exportGameState() {
    return {
        ...gameState,
        settings: loadSettings(),
        progress: loadProgress()
    };
}

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyPress(e) {
    switch(e.key.toLowerCase()) {
        case 'u':
        case 'z':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                undoMove();
            }
            break;
        case 'r':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                loadLevel(gameState.level);
            }
            break;
        case 'escape':
            hideWinModal();
            hideSettingsModal();
            hideLevelsModal();
            break;
    }
}

// Add keyboard event listener
document.addEventListener('keydown', handleKeyPress);

// Initialize game when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

// Expose some functions to window for debugging
window.gameDebug = {
    getState: () => gameState,
    loadLevel: loadLevel,
    autoSolve: autoSolve,
    exportState: exportGameState,
    addCoins: (amount) => {
        const newTotal = addCoins(amount);
        updateCoinsDisplay(newTotal);
    },
    resetProgress: () => {
        resetProgress();
        window.location.reload();
    },
    // Level generation tools
    generateLevels: (count) => {
        if (typeof generateLevels === 'function') {
            return generateLevels(count);
        }
        console.error('Level generator not loaded');
    },
    preGenerateNextBatch: (count = 50) => {
        if (typeof preGenerateLevels === 'function') {
            const start = gameState.level + 1;
            preGenerateLevels(start, count);
        }
    },
    getLevelStats: (levelNum) => {
        if (typeof getLevelStatistics === 'function') {
            return getLevelStatistics(levelNum || gameState.level);
        }
    },
    exportGeneratedLevels: () => {
        if (typeof exportAllGeneratedLevels === 'function') {
            const json = exportAllGeneratedLevels();
            console.log('Generated levels:', json);
            return json;
        }
    },
    clearLevelCache: () => {
        if (typeof clearGeneratedLevelsCache === 'function') {
            clearGeneratedLevelsCache();
            console.log('Level cache cleared. Reload to regenerate.');
        }
    }
};

console.log('💡 Debug commands available via window.gameDebug');
console.log('📊 Level generation tools: generateLevels(count), preGenerateNextBatch(count), getLevelStats(level)');
