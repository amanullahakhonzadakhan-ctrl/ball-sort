/**
 * LEVELS.JS
 * Contains all level configurations for the Glass Sort game
 * Each level is defined by an array of tubes, where each tube contains colored balls
 */

const LEVELS = {
    // Level 1: Simple introduction (2 colors)
    1: {
        tubes: [
            ['red', 'red', 'blue', 'blue'],
            ['blue', 'blue', 'red', 'red'],
            [],
            []
        ]
    },
    
    // Level 2: 3 colors
    2: {
        tubes: [
            ['red', 'blue', 'green', 'red'],
            ['green', 'red', 'blue', 'green'],
            ['blue', 'green', 'red', 'blue'],
            [],
            []
        ]
    },
    
    // Level 3: 4 colors
    3: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['yellow', 'red', 'blue', 'green'],
            ['green', 'yellow', 'red', 'blue'],
            ['blue', 'green', 'yellow', 'red'],
            [],
            []
        ]
    },
    
    // Level 4: 5 colors
    4: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'red', 'blue', 'green'],
            ['yellow', 'purple', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'red'],
            ['blue', 'green', 'yellow', 'purple'],
            [],
            []
        ]
    },
    
    // Level 5: More complex 5 colors
    5: {
        tubes: [
            ['red', 'purple', 'blue', 'green'],
            ['yellow', 'red', 'purple', 'blue'],
            ['green', 'yellow', 'red', 'purple'],
            ['blue', 'green', 'yellow', 'red'],
            ['purple', 'blue', 'green', 'yellow'],
            [],
            []
        ]
    },
    
    // Level 6: 6 colors
    6: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            [],
            []
        ]
    },
    
    // Level 7: 7 colors
    7: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'red'],
            ['blue', 'green', 'yellow', 'purple'],
            ['orange', 'pink', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            ['pink', 'red', 'blue', 'green'],
            ['yellow', 'purple', 'orange', 'pink'],
            [],
            []
        ]
    },
    
    // Level 8: 8 colors
    8: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            [],
            []
        ]
    },
    
    // Level 9: 9 colors - challenging
    9: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            ['lime', 'red', 'blue', 'green'],
            ['yellow', 'purple', 'orange', 'pink'],
            ['cyan', 'lime', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            ['pink', 'cyan', 'lime', 'red'],
            ['blue', 'green', 'yellow', 'purple'],
            ['orange', 'pink', 'cyan', 'lime'],
            [],
            []
        ]
    },
    
    // Level 10: 10 colors - expert level
    10: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            ['lime', 'indigo', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            ['pink', 'cyan', 'lime', 'indigo'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            ['lime', 'indigo', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            ['pink', 'cyan', 'lime', 'indigo'],
            [],
            []
        ]
    },
    
    // Level 11: Mixed difficulty
    11: {
        tubes: [
            ['red', 'red', 'blue', 'green'],
            ['blue', 'green', 'yellow', 'yellow'],
            ['purple', 'purple', 'orange', 'orange'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            [],
            []
        ]
    },
    
    // Level 12: Strategic challenge
    12: {
        tubes: [
            ['red', 'blue', 'red', 'blue'],
            ['green', 'yellow', 'green', 'yellow'],
            ['purple', 'orange', 'purple', 'orange'],
            ['pink', 'cyan', 'pink', 'cyan'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            [],
            []
        ]
    },
    
    // Level 13-20: Additional challenging levels
    13: {
        tubes: [
            ['red', 'green', 'blue', 'yellow'],
            ['blue', 'red', 'green', 'yellow'],
            ['yellow', 'blue', 'red', 'green'],
            ['green', 'yellow', 'blue', 'red'],
            ['purple', 'purple', 'purple', 'purple'],
            [],
            []
        ]
    },
    
    14: {
        tubes: [
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            ['lime', 'cyan', 'red', 'blue'],
            ['green', 'yellow', 'purple', 'orange'],
            ['lime', 'cyan', 'lime', 'cyan'],
            [],
            []
        ]
    },
    
    15: {
        tubes: [
            ['red', 'red', 'red', 'blue'],
            ['blue', 'blue', 'green', 'green'],
            ['green', 'yellow', 'yellow', 'yellow'],
            ['purple', 'purple', 'purple', 'orange'],
            ['orange', 'orange', 'pink', 'pink'],
            ['pink', 'cyan', 'cyan', 'cyan'],
            ['red', 'blue', 'green', 'yellow'],
            ['purple', 'orange', 'pink', 'cyan'],
            [],
            []
        ]
    }
};

/**
 * Get level configuration by level number
 * @param {number} levelNumber - The level number to retrieve
 * @returns {Object|null} - Level configuration or null if not found
 */
function getLevel(levelNumber) {
    return LEVELS[levelNumber] || null;
}

/**
 * Get total number of levels
 * @returns {number} - Total count of levels
 */
function getTotalLevels() {
    return Object.keys(LEVELS).length;
}

/**
 * Check if a level exists
 * @param {number} levelNumber - The level number to check
 * @returns {boolean} - True if level exists
 */
function levelExists(levelNumber) {
    return LEVELS.hasOwnProperty(levelNumber);
}

/**
 * Generate a random level (for future expansion)
 * @param {number} colorCount - Number of different colors
 * @param {number} emptyTubes - Number of empty tubes
 * @returns {Object} - Generated level configuration
 */
function generateRandomLevel(colorCount = 5, emptyTubes = 2) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'lime', 'indigo'];
    const selectedColors = colors.slice(0, colorCount);
    
    // Create array of all balls (4 of each color)
    const allBalls = [];
    selectedColors.forEach(color => {
        for (let i = 0; i < 4; i++) {
            allBalls.push(color);
        }
    });
    
    // Shuffle the balls
    for (let i = allBalls.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allBalls[i], allBalls[j]] = [allBalls[j], allBalls[i]];
    }
    
    // Distribute balls into tubes
    const tubes = [];
    const ballsPerTube = 4;
    const filledTubes = colorCount;
    
    for (let i = 0; i < filledTubes; i++) {
        tubes.push(allBalls.splice(0, ballsPerTube));
    }
    
    // Add empty tubes
    for (let i = 0; i < emptyTubes; i++) {
        tubes.push([]);
    }
    
    return { tubes };
}

// ===== DYNAMIC LEVEL GENERATION INTEGRATION =====

/**
 * Cache for generated levels
 */
let generatedLevelsCache = null;

/**
 * Initialize level generation system
 * @param {number} maxLevels - Maximum number of levels to pre-generate
 */
function initializeLevelGeneration(maxLevels = 100) {
    if (typeof generateLevelBatch === 'function') {
        console.log('🎲 Pre-generating first 100 levels...');
        try {
            generatedLevelsCache = generateLevelBatch(16, maxLevels + 15);
            console.log(`✅ Generated ${Object.keys(generatedLevelsCache).length} levels`);
        } catch (error) {
            console.error('Failed to generate levels:', error);
        }
    }
}

/**
 * Get level with dynamic generation support
 * @param {number} levelNumber - Level number to retrieve
 * @returns {Object|null} - Level configuration
 */
function getLevelDynamic(levelNumber) {
    // First, check static levels (1-15)
    if (LEVELS[levelNumber]) {
        return LEVELS[levelNumber];
    }
    
    // Check if levelGenerator is available
    if (typeof generateLevelBatch !== 'function') {
        console.warn('Level generator not loaded, using fallback');
        return generateRandomLevel(5, 2);
    }
    
    // Check cache
    if (generatedLevelsCache && generatedLevelsCache[levelNumber]) {
        return generatedLevelsCache[levelNumber];
    }
    
    // Generate on-demand
    console.log(`🎲 Generating level ${levelNumber} on-demand...`);
    try {
        const config = getConfigurationForLevel(levelNumber);
        let tubes = createSolvedState(config.numColors, config.numEmptyTubes);
        tubes = shuffleBoard(tubes, config.shuffleMoves, config.numColors);
        
        // Cache it
        if (!generatedLevelsCache) {
            generatedLevelsCache = {};
        }
        generatedLevelsCache[levelNumber] = { tubes };
        
        return { tubes };
    } catch (error) {
        console.error(`Failed to generate level ${levelNumber}:`, error);
        return generateRandomLevel(5, 2);
    }
}

/**
 * Pre-generate a batch of levels
 * @param {number} startLevel - Start level
 * @param {number} count - Number of levels to generate
 */
function preGenerateLevels(startLevel, count) {
    if (typeof generateLevelBatch === 'function') {
        const batch = generateLevelBatch(startLevel, startLevel + count - 1);
        
        if (!generatedLevelsCache) {
            generatedLevelsCache = {};
        }
        
        Object.assign(generatedLevelsCache, batch);
        console.log(`✅ Pre-generated levels ${startLevel}-${startLevel + count - 1}`);
    }
}

/**
 * Get total levels including generated ones
 * @returns {number} - Total available levels
 */
function getTotalLevelsWithGeneration() {
    const staticLevels = Object.keys(LEVELS).length;
    const generatedLevels = generatedLevelsCache ? Object.keys(generatedLevelsCache).length : 0;
    
    // Theoretically infinite with generation, but cap at 5000 for UI
    return Math.max(staticLevels, generatedLevels, 5000);
}

/**
 * Clear generated levels cache (useful for regeneration)
 */
function clearGeneratedLevelsCache() {
    generatedLevelsCache = null;
    console.log('🗑️ Generated levels cache cleared');
}

/**
 * Export all generated levels to JSON
 * @returns {string} - JSON string of all levels
 */
function exportAllGeneratedLevels() {
    if (!generatedLevelsCache) {
        return JSON.stringify({});
    }
    
    return JSON.stringify(generatedLevelsCache, null, 2);
}

/**
 * Get statistics for a level
 * @param {number} levelNumber - Level number
 * @returns {Object} - Level statistics
 */
function getLevelStatistics(levelNumber) {
    const level = getLevelDynamic(levelNumber);
    if (!level) return null;
    
    const tubes = level.tubes;
    return {
        level: levelNumber,
        totalTubes: tubes.length,
        emptyTubes: tubes.filter(t => t.length === 0).length,
        fullTubes: tubes.filter(t => t.length === 4).length,
        totalBalls: tubes.reduce((sum, tube) => sum + tube.length, 0),
        uniqueColors: [...new Set(tubes.flat())].length
    };
}
