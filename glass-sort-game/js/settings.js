/**
 * SETTINGS.JS
 * Manages user settings and localStorage operations
 */

// Default user settings
const DEFAULT_SETTINGS = {
    sound: true,
    music: false,
    theme: 'dark'
};

// Default user progress
const DEFAULT_PROGRESS = {
    currentLevel: 1,
    completedLevels: [],
    coins: 0,
    totalMoves: 0
};

/**
 * Load settings from localStorage
 * @returns {Object} - User settings
 */
function loadSettings() {
    try {
        const savedSettings = localStorage.getItem('glassSort_settings');
        if (savedSettings) {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
    return { ...DEFAULT_SETTINGS };
}

/**
 * Save settings to localStorage
 * @param {Object} settings - Settings object to save
 */
function saveSettings(settings) {
    try {
        localStorage.setItem('glassSort_settings', JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

/**
 * Load user progress from localStorage
 * @returns {Object} - User progress
 */
function loadProgress() {
    try {
        const savedProgress = localStorage.getItem('glassSort_progress');
        if (savedProgress) {
            return { ...DEFAULT_PROGRESS, ...JSON.parse(savedProgress) };
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
    return { ...DEFAULT_PROGRESS };
}

/**
 * Save user progress to localStorage
 * @param {Object} progress - Progress object to save
 */
function saveProgress(progress) {
    try {
        localStorage.setItem('glassSort_progress', JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

/**
 * Mark a level as completed
 * @param {number} levelNumber - Level to mark as completed
 */
function markLevelCompleted(levelNumber) {
    const progress = loadProgress();
    if (!progress.completedLevels.includes(levelNumber)) {
        progress.completedLevels.push(levelNumber);
        progress.completedLevels.sort((a, b) => a - b);
    }
    // Update current level if this was the current level
    if (levelNumber === progress.currentLevel) {
        progress.currentLevel = levelNumber + 1;
    }
    saveProgress(progress);
}

/**
 * Add coins to user's balance
 * @param {number} amount - Amount of coins to add
 */
function addCoins(amount) {
    const progress = loadProgress();
    progress.coins += amount;
    saveProgress(progress);
    return progress.coins;
}

/**
 * Get current coin balance
 * @returns {number} - Current coin balance
 */
function getCoins() {
    const progress = loadProgress();
    return progress.coins;
}

/**
 * Update current level
 * @param {number} levelNumber - New current level
 */
function setCurrentLevel(levelNumber) {
    const progress = loadProgress();
    progress.currentLevel = levelNumber;
    saveProgress(progress);
}

/**
 * Get current level
 * @returns {number} - Current level number
 */
function getCurrentLevel() {
    const progress = loadProgress();
    return progress.currentLevel;
}

/**
 * Check if a level is completed
 * @param {number} levelNumber - Level to check
 * @returns {boolean} - True if level is completed
 */
function isLevelCompleted(levelNumber) {
    const progress = loadProgress();
    return progress.completedLevels.includes(levelNumber);
}

/**
 * Get all completed levels
 * @returns {Array} - Array of completed level numbers
 */
function getCompletedLevels() {
    const progress = loadProgress();
    return progress.completedLevels;
}

/**
 * Reset all progress
 */
function resetProgress() {
    try {
        localStorage.removeItem('glassSort_progress');
        return true;
    } catch (error) {
        console.error('Error resetting progress:', error);
        return false;
    }
}

/**
 * Reset all settings
 */
function resetSettings() {
    try {
        localStorage.removeItem('glassSort_settings');
        return true;
    } catch (error) {
        console.error('Error resetting settings:', error);
        return false;
    }
}

/**
 * Toggle sound setting
 * @returns {boolean} - New sound state
 */
function toggleSound() {
    const settings = loadSettings();
    settings.sound = !settings.sound;
    saveSettings(settings);
    return settings.sound;
}

/**
 * Toggle music setting
 * @returns {boolean} - New music state
 */
function toggleMusic() {
    const settings = loadSettings();
    settings.music = !settings.music;
    saveSettings(settings);
    return settings.music;
}

/**
 * Set theme
 * @param {string} theme - Theme name ('dark' or 'light')
 */
function setTheme(theme) {
    const settings = loadSettings();
    settings.theme = theme;
    saveSettings(settings);
    applyTheme(theme);
}

/**
 * Apply theme to the document
 * @param {string} theme - Theme name
 */
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

/**
 * Get current theme
 * @returns {string} - Current theme name
 */
function getTheme() {
    const settings = loadSettings();
    return settings.theme;
}

/**
 * Check if sound is enabled
 * @returns {boolean} - True if sound is enabled
 */
function isSoundEnabled() {
    const settings = loadSettings();
    return settings.sound;
}

/**
 * Check if music is enabled
 * @returns {boolean} - True if music is enabled
 */
function isMusicEnabled() {
    const settings = loadSettings();
    return settings.music;
}

/**
 * Add moves to total count
 * @param {number} moves - Number of moves to add
 */
function addTotalMoves(moves) {
    const progress = loadProgress();
    progress.totalMoves += moves;
    saveProgress(progress);
}

/**
 * Get total moves across all games
 * @returns {number} - Total moves
 */
function getTotalMoves() {
    const progress = loadProgress();
    return progress.totalMoves;
}

/**
 * Initialize settings on page load
 */
function initSettings() {
    const settings = loadSettings();
    applyTheme(settings.theme);
    return settings;
}

/**
 * Export all user data as JSON (for backup)
 * @returns {string} - JSON string of all user data
 */
function exportUserData() {
    return JSON.stringify({
        settings: loadSettings(),
        progress: loadProgress(),
        exportDate: new Date().toISOString()
    });
}

/**
 * Import user data from JSON (for restore)
 * @param {string} jsonData - JSON string of user data
 * @returns {boolean} - True if successful
 */
function importUserData(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        if (data.settings) {
            saveSettings(data.settings);
        }
        if (data.progress) {
            saveProgress(data.progress);
        }
        return true;
    } catch (error) {
        console.error('Error importing user data:', error);
        return false;
    }
}

// ===== STORE & INVENTORY MANAGEMENT =====

/**
 * Load user inventory from localStorage
 * @returns {Object} - User inventory
 */
function loadInventory() {
    try {
        const savedInventory = localStorage.getItem('glassSort_inventory');
        if (savedInventory) {
            return JSON.parse(savedInventory);
        }
    } catch (error) {
        console.error('Error loading inventory:', error);
    }
    return {
        ownedPacks: ['pack1'], // Classic pack is owned by default
        activePack: 'pack1'
    };
}

/**
 * Save user inventory to localStorage
 * @param {Object} inventory - Inventory object to save
 */
function saveInventory(inventory) {
    try {
        localStorage.setItem('glassSort_inventory', JSON.stringify(inventory));
    } catch (error) {
        console.error('Error saving inventory:', error);
    }
}

/**
 * Check if user owns a pack
 * @param {string} packId - Pack ID to check
 * @returns {boolean} - True if owned
 */
function ownsPack(packId) {
    const inventory = loadInventory();
    return inventory.ownedPacks.includes(packId);
}

/**
 * Purchase a pack
 * @param {string} packId - Pack ID to purchase
 * @param {number} price - Price of the pack
 * @returns {boolean} - True if purchase successful
 */
function purchasePack(packId, price) {
    const currentCoins = getCoins();
    
    // Check if already owned
    if (ownsPack(packId)) {
        console.log('Pack already owned');
        return false;
    }
    
    // Check if enough coins
    if (currentCoins < price) {
        console.log('Insufficient coins');
        return false;
    }
    
    // Deduct coins
    const progress = loadProgress();
    progress.coins -= price;
    saveProgress(progress);
    
    // Add to inventory
    const inventory = loadInventory();
    inventory.ownedPacks.push(packId);
    saveInventory(inventory);
    
    console.log(`Pack ${packId} purchased for ${price} coins`);
    return true;
}

/**
 * Get active pack
 * @returns {string} - Active pack ID
 */
function getActivePack() {
    const inventory = loadInventory();
    return inventory.activePack;
}

/**
 * Set active pack
 * @param {string} packId - Pack ID to set as active
 */
function setActivePack(packId) {
    if (!ownsPack(packId)) {
        console.log('Cannot set pack as active - not owned');
        return false;
    }
    
    const inventory = loadInventory();
    inventory.activePack = packId;
    saveInventory(inventory);
    return true;
}

/**
 * Get all owned packs
 * @returns {Array} - Array of owned pack IDs
 */
function getOwnedPacks() {
    const inventory = loadInventory();
    return inventory.ownedPacks;
}
