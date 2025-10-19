/**
 * UI.JS
 * Handles all DOM manipulation and UI updates
 */

/**
 * Render the game board with tubes and balls
 * @param {Array} tubes - Array of tubes with balls
 */
function renderBoard(tubes) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    tubes.forEach((tube, index) => {
        const tubeElement = createTubeElement(tube, index);
        gameBoard.appendChild(tubeElement);
    });
}

/**
 * Create a tube element with balls
 * @param {Array} balls - Array of ball colors
 * @param {number} index - Tube index
 * @returns {HTMLElement} - Tube element
 */
function createTubeElement(balls, index) {
    const tubeElement = document.createElement('div');
    tubeElement.className = 'tube';
    tubeElement.dataset.tubeIndex = index;
    
    // Add balls to tube
    balls.forEach(color => {
        const ballElement = document.createElement('div');
        ballElement.className = `ball ${color}`;
        tubeElement.appendChild(ballElement);
    });
    
    return tubeElement;
}

/**
 * Highlight a tube as selected
 * @param {number} tubeIndex - Index of tube to select
 */
function selectTube(tubeIndex) {
    const tubes = document.querySelectorAll('.tube');
    tubes.forEach(tube => tube.classList.remove('selected'));
    
    if (tubeIndex !== null) {
        tubes[tubeIndex].classList.add('selected');
        // Lift the top ball
        const balls = tubes[tubeIndex].querySelectorAll('.ball');
        if (balls.length > 0) {
            balls[balls.length - 1].classList.add('lifting');
        }
    }
}

/**
 * Deselect all tubes
 */
function deselectAllTubes() {
    const tubes = document.querySelectorAll('.tube');
    tubes.forEach(tube => {
        tube.classList.remove('selected');
    });
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        ball.classList.remove('lifting');
    });
}

/**
 * Animate ball movement between tubes
 * @param {number} fromIndex - Source tube index
 * @param {number} toIndex - Destination tube index
 * @param {Function} callback - Callback function after animation
 */
function animateBallMove(fromIndex, toIndex, callback) {
    const tubes = document.querySelectorAll('.tube');
    const fromTube = tubes[fromIndex];
    const toTube = tubes[toIndex];
    
    const fromBalls = fromTube.querySelectorAll('.ball');
    const movingBall = fromBalls[fromBalls.length - 1];
    
    if (!movingBall) {
        callback();
        return;
    }
    
    // Add moving animation class
    movingBall.classList.add('moving');
    
    // Remove ball after animation
    setTimeout(() => {
        movingBall.remove();
        callback();
    }, 600);
}

/**
 * Show shake animation on invalid move
 * @param {number} tubeIndex - Tube to shake
 */
function shakeInvalidTube(tubeIndex) {
    const tubes = document.querySelectorAll('.tube');
    tubes[tubeIndex].classList.add('shake');
    setTimeout(() => {
        tubes[tubeIndex].classList.remove('shake');
    }, 500);
}

/**
 * Update move counter display
 * @param {number} moves - Current move count
 */
function updateMoveCount(moves) {
    const moveCountElement = document.getElementById('moves-count');
    moveCountElement.textContent = moves;
    
    // Add pulse animation
    moveCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        moveCountElement.style.transform = 'scale(1)';
    }, 200);
}

/**
 * Update level number display
 * @param {number} level - Current level number
 */
function updateLevelNumber(level) {
    const levelElement = document.getElementById('level-number');
    levelElement.textContent = level;
}

/**
 * Update coins display
 * @param {number} coins - Current coin count
 */
function updateCoinsDisplay(coins) {
    const coinsElement = document.getElementById('coins-count');
    coinsElement.textContent = coins;
    
    // Add pulse animation
    coinsElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
        coinsElement.style.transform = 'scale(1)';
    }, 300);
}

/**
 * Show win modal with confetti
 * @param {number} moves - Final move count
 * @param {number} level - Completed level
 */
function showWinModal(moves, level) {
    const modal = document.getElementById('win-modal');
    const finalMovesElement = document.getElementById('final-moves');
    const finalLevelElement = document.getElementById('final-level');
    
    finalMovesElement.textContent = moves;
    finalLevelElement.textContent = level;
    
    modal.classList.add('active');
    
    // Generate confetti
    generateConfetti();
}

/**
 * Hide win modal
 */
function hideWinModal() {
    const modal = document.getElementById('win-modal');
    modal.classList.remove('active');
    
    // Clear confetti
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
}

/**
 * Generate confetti animation
 */
function generateConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

/**
 * Show settings modal
 */
function showSettingsModal() {
    const modal = document.getElementById('settings-modal');
    modal.classList.add('active');
    
    // Load current settings
    const settings = loadSettings();
    document.getElementById('sound-toggle').checked = settings.sound;
    document.getElementById('music-toggle').checked = settings.music;
    
    // Update theme buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === settings.theme) {
            btn.classList.add('active');
        }
    });
}

/**
 * Hide settings modal
 */
function hideSettingsModal() {
    const modal = document.getElementById('settings-modal');
    modal.classList.remove('active');
}

/**
 * Show levels modal
 */
function showLevelsModal() {
    const modal = document.getElementById('levels-modal');
    modal.classList.add('active');
    renderLevelGrid();
}

/**
 * Hide levels modal
 */
function hideLevelsModal() {
    const modal = document.getElementById('levels-modal');
    modal.classList.remove('active');
}

/**
 * Render level selection grid
 */
function renderLevelGrid() {
    const levelsGrid = document.getElementById('levels-grid');
    levelsGrid.innerHTML = '';
    
    // Support up to 5000 levels with dynamic generation
    const totalLevels = typeof getTotalLevelsWithGeneration === 'function' 
        ? Math.min(getTotalLevelsWithGeneration(), 200) // Show first 200 levels in UI
        : getTotalLevels();
    
    const currentLevel = getCurrentLevel();
    const completedLevels = getCompletedLevels();
    
    // Add info message about unlimited levels
    if (typeof getLevelDynamic === 'function') {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 10px; margin-bottom: 10px; background: rgba(92, 153, 212, 0.2); border-radius: 10px; font-size: 0.9rem;';
        infoDiv.innerHTML = '🎲 <strong>Infinite Levels!</strong><br>Levels are generated dynamically as you play';
        levelsGrid.appendChild(infoDiv);
    }
    
    for (let i = 1; i <= totalLevels; i++) {
        const levelBtn = document.createElement('button');
        levelBtn.className = 'level-btn';
        levelBtn.textContent = i;
        levelBtn.dataset.level = i;
        
        // Mark completed levels
        if (completedLevels.includes(i)) {
            levelBtn.classList.add('completed');
            levelBtn.textContent += ' ✓';
        }
        
        // Lock levels beyond current + 1
        if (i > currentLevel && !completedLevels.includes(i)) {
            levelBtn.classList.add('locked');
            levelBtn.textContent = '🔒';
            levelBtn.disabled = true;
        }
        
        levelsGrid.appendChild(levelBtn);
    }
    
    // Add "Load More" button if there are more levels
    if (currentLevel > 200 || completedLevels.some(l => l > 200)) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'level-btn';
        loadMoreBtn.textContent = '+ More';
        loadMoreBtn.style.background = 'var(--accent-color)';
        loadMoreBtn.onclick = () => {
            alert(`🎮 You're currently on level ${currentLevel}!\n\nKeep playing to unlock more levels.\nThe game can generate up to 5,000 unique levels!`);
        };
        levelsGrid.appendChild(loadMoreBtn);
    }
}

/**
 * Show loading ad overlay
 * @param {number} duration - Duration in seconds
 * @param {Function} callback - Callback after ad completes
 */
function showLoadingAd(duration, callback) {
    const overlay = document.getElementById('loading-ad-overlay');
    const timerElement = document.getElementById('ad-timer');
    
    overlay.classList.add('active');
    
    let timeLeft = duration;
    timerElement.textContent = timeLeft + 's';
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            overlay.classList.remove('active');
            callback();
        }
    }, 1000);
}

/**
 * Show reward granted toast
 * @param {number} amount - Reward amount
 */
function showRewardToast(amount) {
    const toast = document.getElementById('reward-toast');
    const rewardText = toast.querySelector('.reward-text');
    
    rewardText.textContent = `+${amount} Coins Earned!`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Background music instance
let backgroundMusic = null;

/**
 * Initialize and play background music
 */
function initBackgroundMusic() {
    try {
        backgroundMusic = new Audio('assets/sounds/background.mp3');
        backgroundMusic.loop = true; // Loop continuously
        backgroundMusic.volume = 0.3; // Lower volume for background music
        
        // Start playing if music is enabled
        const settings = loadSettings();
        if (settings.music) {
            backgroundMusic.play().catch(err => {
                console.log('Background music autoplay blocked:', err);
                console.log('Music will start on first user interaction');
            });
        }
        
        console.log('🎵 Background music initialized');
    } catch (error) {
        console.log('Background music not available:', error);
    }
}

/**
 * Play background music
 */
function playBackgroundMusic() {
    const settings = loadSettings();
    if (backgroundMusic && settings.music) {
        backgroundMusic.play().catch(err => {
            console.log('Background music play failed:', err);
        });
    }
}

/**
 * Pause background music
 */
function pauseBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

/**
 * Stop background music
 */
function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

/**
 * Set background music volume
 * @param {number} volume - Volume level (0.0 to 1.0)
 */
function setBackgroundMusicVolume(volume) {
    if (backgroundMusic) {
        backgroundMusic.volume = Math.max(0, Math.min(1, volume));
    }
}

/**
 * Toggle background music based on sound settings
 */
function toggleBackgroundMusic() {
    if (isSoundEnabled()) {
        playBackgroundMusic();
    } else {
        pauseBackgroundMusic();
    }
}

/**
 * Play sound effect
 * @param {string} soundName - Name of the sound file (without extension)
 */
function playSound(soundName) {
    if (!isSoundEnabled()) return;
    
    try {
        const audio = new Audio(`assets/sounds/${soundName}.mp3`);
        audio.volume = 0.5;
        audio.play().catch(err => {
            console.log('Sound play failed:', err);
        });
    } catch (error) {
        console.log('Sound not available:', soundName);
    }
}

/**
 * Show confirmation dialog
 * @param {string} message - Confirmation message
 * @param {Function} onConfirm - Callback if confirmed
 */
function showConfirmDialog(message, onConfirm) {
    if (confirm(message)) {
        onConfirm();
    }
}

/**
 * Initialize UI event listeners
 */
function initUIEventListeners() {
    // Settings modal
    document.getElementById('settings-btn').addEventListener('click', showSettingsModal);
    document.getElementById('close-settings-btn').addEventListener('click', hideSettingsModal);
    
    // Levels modal
    document.getElementById('levels-btn').addEventListener('click', showLevelsModal);
    document.getElementById('close-levels-btn').addEventListener('click', hideLevelsModal);
    
    // Sound toggle
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
        const settings = loadSettings();
        settings.sound = e.target.checked;
        saveSettings(settings);
        if (e.target.checked) {
            playSound('click');
        }
    });
    
    // Music toggle
    document.getElementById('music-toggle').addEventListener('change', (e) => {
        const settings = loadSettings();
        settings.music = e.target.checked;
        saveSettings(settings);
        
        // Control background music
        if (e.target.checked) {
            playBackgroundMusic();
        } else {
            pauseBackgroundMusic();
        }
    });
    
    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            setTheme(theme);
            
            // Update active state
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            playSound('click');
        });
    });
    
    // Reset progress button
    document.getElementById('reset-progress-btn').addEventListener('click', () => {
        showConfirmDialog('Are you sure you want to reset all progress? This cannot be undone.', () => {
            resetProgress();
            window.location.reload();
        });
    });
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Store modal
    document.getElementById('store-btn').addEventListener('click', showStoreModal);
    document.getElementById('close-store-btn').addEventListener('click', hideStoreModal);
    
    // Store tabs
    document.querySelectorAll('.store-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchStoreTab(tab.dataset.tab);
        });
    });
    
    // Store items
    document.querySelectorAll('.store-item').forEach(item => {
        item.addEventListener('click', () => {
            handleStoreItemClick(item);
        });
    });
}

/**
 * Update UI for theme changes
 */
function updateThemeUI() {
    const theme = getTheme();
    applyTheme(theme);
}

/**
 * Add a celebration effect on level complete
 */
function celebrateLevelComplete() {
    playSound('win');
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10);
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    playSound('error');
    console.error(message);
}

/**
 * Show store modal
 */
function showStoreModal() {
    const modal = document.getElementById('store-modal');
    modal.classList.add('active');
    updateStoreUI();
}

/**
 * Hide store modal
 */
function hideStoreModal() {
    const modal = document.getElementById('store-modal');
    modal.classList.remove('active');
}

/**
 * Update store UI with current coins and owned items
 */
function updateStoreUI() {
    // Update coin display in store
    const storeCoins = document.getElementById('store-coins');
    storeCoins.textContent = getCoins();
    
    // Update owned items
    const ownedPacks = getOwnedPacks();
    const storeItems = document.querySelectorAll('.store-item');
    
    storeItems.forEach(item => {
        const packId = item.dataset.item;
        const price = parseInt(item.dataset.price);
        const priceElement = item.querySelector('.item-price');
        
        if (ownedPacks.includes(packId)) {
            item.classList.add('owned');
            priceElement.classList.add('owned');
            priceElement.textContent = '✓ Owned';
        } else {
            item.classList.remove('owned');
            priceElement.classList.remove('owned');
            
            // Check if user can afford it
            if (getCoins() < price) {
                item.classList.add('locked');
                priceElement.classList.add('locked');
            } else {
                item.classList.remove('locked');
                priceElement.classList.remove('locked');
            }
        }
    });
}

/**
 * Handle store item click
 * @param {HTMLElement} itemElement - Clicked item element
 */
function handleStoreItemClick(itemElement) {
    const packId = itemElement.dataset.item;
    const price = parseInt(itemElement.dataset.price);
    
    // Check if already owned
    if (ownsPack(packId)) {
        // Set as active pack
        setActivePack(packId);
        playSound('click');
        showRewardToast('Pack Activated!');
        return;
    }
    
    // Attempt purchase
    const success = purchasePack(packId, price);
    
    if (success) {
        playSound('win');
        updateCoinsDisplay(getCoins());
        updateStoreUI();
        showRewardToast(`Pack Purchased! -${price} Coins`);
        
        // Add purchase animation
        itemElement.classList.add('purchased');
        setTimeout(() => {
            itemElement.classList.remove('purchased');
        }, 500);
    } else {
        playSound('error');
        showInsufficientCoinsMessage();
    }
}

/**
 * Show insufficient coins message
 */
function showInsufficientCoinsMessage() {
    // Check if message already exists
    let message = document.querySelector('.insufficient-coins');
    
    if (!message) {
        message = document.createElement('div');
        message.className = 'insufficient-coins';
        message.textContent = '❌ Not enough coins! Watch an ad to earn more.';
        
        const storeActions = document.querySelector('.store-actions');
        storeActions.insertBefore(message, storeActions.firstChild);
    }
    
    // Shake animation
    message.style.animation = 'none';
    setTimeout(() => {
        message.style.animation = 'shake 0.5s ease';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

/**
 * Switch store tabs
 * @param {string} tabName - Tab to switch to ('colors' or 'emojis')
 */
function switchStoreTab(tabName) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.store-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update content visibility
    const colorsStore = document.getElementById('colors-store');
    const emojisStore = document.getElementById('emojis-store');
    
    if (tabName === 'colors') {
        colorsStore.classList.remove('hidden');
        emojisStore.classList.add('hidden');
    } else {
        colorsStore.classList.add('hidden');
        emojisStore.classList.remove('hidden');
    }
    
    playSound('click');
}

/**
 * Initialize UI on page load
 */
function initUI() {
    initUIEventListeners();
    updateThemeUI();
    updateCoinsDisplay(getCoins());
    
    // Initialize background music
    initBackgroundMusic();
    
    // Ensure music starts on first user interaction if blocked
    document.addEventListener('click', () => {
        playBackgroundMusic();
    }, { once: true });
}
