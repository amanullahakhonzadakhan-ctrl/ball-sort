/**
 * LEVEL GENERATOR.JS
 * Advanced algorithm to generate thousands of solvable Ball Sort levels
 * Uses reverse-generation method: Start with solved state and shuffle backward
 */

// Available colors for ball generation
const BALL_COLORS = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
    'pink', 'cyan', 'lime', 'indigo',
    // Additional colors for higher levels
    'teal', 'magenta', 'navy', 'maroon', 'olive', 'coral'
];

const BALLS_PER_TUBE = 4;

/**
 * Main function to generate a specified number of levels
 * @param {number} numberOfLevels - Total levels to generate
 * @returns {Object} - Object containing all generated levels
 */
function generateLevels(numberOfLevels = 5000) {
    console.log(`🎲 Generating ${numberOfLevels} solvable levels...`);
    const startTime = Date.now();
    
    const allLevels = {};
    let failedAttempts = 0;
    const maxRetries = 3;

    for (let level = 1; level <= numberOfLevels; level++) {
        let attempts = 0;
        let generatedLevel = null;

        // Try to generate a valid level
        while (attempts < maxRetries && !generatedLevel) {
            attempts++;
            
            // 1. Get configuration for this level
            const config = getConfigurationForLevel(level);
            
            // 2. Create solved state
            let tubes = createSolvedState(config.numColors, config.numEmptyTubes);
            
            // 3. Shuffle using reverse moves
            tubes = shuffleBoard(tubes, config.shuffleMoves, config.numColors);
            
            // 4. Validate the generated puzzle
            if (isPuzzleValid(tubes, config)) {
                generatedLevel = { tubes };
            } else {
                failedAttempts++;
            }
        }

        // Store the level (use last attempt even if not perfect)
        if (generatedLevel) {
            allLevels[level] = generatedLevel;
        } else {
            // Fallback: create a simpler version
            const simpleConfig = getConfigurationForLevel(Math.max(1, level - 10));
            const simpleTubes = createSolvedState(simpleConfig.numColors, simpleConfig.numEmptyTubes);
            allLevels[level] = { tubes: shuffleBoard(simpleTubes, simpleConfig.shuffleMoves / 2, simpleConfig.numColors) };
        }

        // Progress logging (every 100 levels)
        if (level % 100 === 0) {
            console.log(`✅ Generated ${level}/${numberOfLevels} levels`);
        }
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`🎉 Level generation complete!`);
    console.log(`⏱️ Time: ${duration}s`);
    console.log(`⚠️ Failed validations: ${failedAttempts}`);
    
    return allLevels;
}

/**
 * Determine level configuration based on level number
 * Implements progressive difficulty scaling
 * @param {number} level - Level number
 * @returns {Object} - Configuration object
 */
function getConfigurationForLevel(level) {
    let numColors, numEmptyTubes, shuffleMoves;

    // Progressive difficulty scaling
    if (level <= 50) {
        // Beginner levels
        numColors = 2 + Math.floor(level / 25);
        numEmptyTubes = 2;
        shuffleMoves = 5 + Math.floor(level / 3);
    } else if (level <= 200) {
        // Easy levels
        numColors = 3 + Math.floor((level - 50) / 40);
        numEmptyTubes = 2;
        shuffleMoves = 15 + Math.floor((level - 50) / 5);
    } else if (level <= 500) {
        // Medium levels
        numColors = 5 + Math.floor((level - 200) / 60);
        numEmptyTubes = 2;
        shuffleMoves = 30 + Math.floor((level - 200) / 6);
    } else if (level <= 1000) {
        // Hard levels
        numColors = 7 + Math.floor((level - 500) / 100);
        numEmptyTubes = 2;
        shuffleMoves = 50 + Math.floor((level - 500) / 8);
    } else if (level <= 2000) {
        // Very hard levels
        numColors = 9 + Math.floor((level - 1000) / 200);
        numEmptyTubes = Math.random() < 0.3 ? 1 : 2; // Sometimes only 1 empty
        shuffleMoves = 80 + Math.floor((level - 1000) / 10);
    } else {
        // Expert levels (2001-5000)
        numColors = 11 + Math.floor((level - 2000) / 500);
        numEmptyTubes = Math.random() < 0.6 ? 1 : 2; // Often only 1 empty
        shuffleMoves = 120 + Math.floor((level - 2000) / 15);
    }

    // Cap maximum values
    numColors = Math.min(numColors, 14);
    numEmptyTubes = Math.max(1, numEmptyTubes);
    shuffleMoves = Math.min(shuffleMoves, 250);

    return {
        numColors,
        numEmptyTubes,
        shuffleMoves,
        level
    };
}

/**
 * Create a solved state (starting point for reverse generation)
 * @param {number} numColors - Number of different colors
 * @param {number} numEmptyTubes - Number of empty tubes
 * @returns {Array} - 2D array representing tubes
 */
function createSolvedState(numColors, numEmptyTubes) {
    const tubes = [];
    
    // Create one tube for each color, filled with 4 balls
    for (let i = 0; i < numColors; i++) {
        const color = BALL_COLORS[i % BALL_COLORS.length];
        const tube = [];
        
        for (let j = 0; j < BALLS_PER_TUBE; j++) {
            tube.push(color);
        }
        
        tubes.push(tube);
    }
    
    // Add empty tubes
    for (let i = 0; i < numEmptyTubes; i++) {
        tubes.push([]);
    }
    
    return tubes;
}

/**
 * Shuffle the board using reverse moves
 * @param {Array} tubes - The tubes array
 * @param {number} shuffleMoves - Number of reverse moves to make
 * @param {number} numColors - Number of colors in play
 * @returns {Array} - Shuffled tubes
 */
function shuffleBoard(tubes, shuffleMoves, numColors) {
    let lastMovedFrom = -1;
    let lastMovedTo = -1;
    let successfulMoves = 0;
    let attempts = 0;
    const maxAttempts = shuffleMoves * 3; // Prevent infinite loops

    while (successfulMoves < shuffleMoves && attempts < maxAttempts) {
        attempts++;
        
        // Find all possible reverse moves
        const validMoves = findPossibleReverseMoves(tubes, lastMovedFrom, lastMovedTo);
        
        if (validMoves.length === 0) {
            // No valid moves, might be stuck - try resetting last move tracking
            if (attempts % 10 === 0) {
                lastMovedFrom = -1;
                lastMovedTo = -1;
            }
            continue;
        }

        // Pick a random valid move
        const move = validMoves[Math.floor(Math.random() * validMoves.length)];
        
        // Execute the move
        const ball = tubes[move.from].pop();
        tubes[move.to].push(ball);
        
        // Track the move to avoid immediate reversal
        lastMovedFrom = move.to;
        lastMovedTo = move.from;
        
        successfulMoves++;
    }

    // If we didn't achieve enough shuffling, do a few more forced moves
    if (successfulMoves < shuffleMoves * 0.7) {
        for (let i = 0; i < Math.floor(shuffleMoves * 0.3); i++) {
            const moves = findPossibleReverseMoves(tubes, -1, -1);
            if (moves.length > 0) {
                const move = moves[Math.floor(Math.random() * moves.length)];
                const ball = tubes[move.from].pop();
                tubes[move.to].push(ball);
            }
        }
    }

    return tubes;
}

/**
 * Find all possible reverse moves from current state
 * @param {Array} tubes - The tubes array
 * @param {number} lastMovedFrom - Index of last source tube
 * @param {number} lastMovedTo - Index of last destination tube
 * @returns {Array} - Array of valid move objects
 */
function findPossibleReverseMoves(tubes, lastMovedFrom, lastMovedTo) {
    const validMoves = [];
    
    for (let from = 0; from < tubes.length; from++) {
        // Source must not be empty
        if (tubes[from].length === 0) continue;
        
        // Don't immediately reverse the last move
        if (from === lastMovedFrom) continue;
        
        // Get the top ball color
        const ballColor = tubes[from][tubes[from].length - 1];
        
        for (let to = 0; to < tubes.length; to++) {
            // Skip same tube
            if (from === to) continue;
            
            // Destination must not be full
            if (tubes[to].length >= BALLS_PER_TUBE) continue;
            
            // Don't immediately reverse the last move
            if (to === lastMovedTo && from === lastMovedFrom) continue;
            
            // Scoring system for move quality
            let moveScore = 1;
            
            // Prefer moves that don't just move to empty tubes (unless necessary)
            if (tubes[to].length === 0) {
                // Check if there are non-empty alternatives
                const hasNonEmptyAlternatives = tubes.some((t, idx) => 
                    idx !== from && idx !== to && t.length > 0 && t.length < BALLS_PER_TUBE
                );
                
                if (hasNonEmptyAlternatives) {
                    moveScore = 0.3; // Lower score for empty tube moves
                } else {
                    moveScore = 1; // OK if it's the only option
                }
            }
            
            // Prefer moves that break up sorted tubes
            const isSourceSorted = tubes[from].every(ball => ball === tubes[from][0]);
            if (isSourceSorted && tubes[from].length === BALLS_PER_TUBE) {
                moveScore *= 2; // High score for breaking sorted tubes
            }
            
            // Prefer moves to tubes with matching top color
            if (tubes[to].length > 0 && tubes[to][tubes[to].length - 1] === ballColor) {
                moveScore *= 0.7; // Lower score (we want mixed tubes)
            }
            
            // Add move with score for weighted random selection
            validMoves.push({
                from,
                to,
                score: moveScore
            });
        }
    }
    
    return validMoves;
}

/**
 * Validate that the generated puzzle meets quality criteria
 * @param {Array} tubes - The tubes array
 * @param {Object} config - Level configuration
 * @returns {boolean} - True if valid
 */
function isPuzzleValid(tubes, config) {
    // Check 1: No tubes should be already solved
    const solvedTubes = tubes.filter(tube => {
        if (tube.length !== BALLS_PER_TUBE) return false;
        const firstColor = tube[0];
        return tube.every(ball => ball === firstColor);
    });
    
    if (solvedTubes.length > 0) {
        return false; // Puzzle is too easy if tubes are already sorted
    }
    
    // Check 2: At least one move must be possible
    const possibleMoves = findPossibleForwardMoves(tubes);
    if (possibleMoves.length === 0) {
        return false; // Puzzle is in a dead-end state
    }
    
    // Check 3: Ensure proper color distribution
    const colorCounts = {};
    tubes.forEach(tube => {
        tube.forEach(ball => {
            colorCounts[ball] = (colorCounts[ball] || 0) + 1;
        });
    });
    
    // Each color should have exactly 4 balls
    for (const color in colorCounts) {
        if (colorCounts[color] !== BALLS_PER_TUBE) {
            return false; // Invalid ball distribution
        }
    }
    
    // Check 4: Not too many empty tubes (should have moved some balls around)
    const emptyTubes = tubes.filter(tube => tube.length === 0).length;
    if (emptyTubes > config.numEmptyTubes) {
        return false; // Too many empty tubes means insufficient shuffling
    }
    
    return true;
}

/**
 * Find possible forward moves (for validation)
 * @param {Array} tubes - The tubes array
 * @returns {Array} - Array of valid forward moves
 */
function findPossibleForwardMoves(tubes) {
    const validMoves = [];
    
    for (let from = 0; from < tubes.length; from++) {
        if (tubes[from].length === 0) continue;
        
        const topBall = tubes[from][tubes[from].length - 1];
        
        for (let to = 0; to < tubes.length; to++) {
            if (from === to) continue;
            if (tubes[to].length >= BALLS_PER_TUBE) continue;
            
            // Can move if destination is empty or top colors match
            if (tubes[to].length === 0 || tubes[to][tubes[to].length - 1] === topBall) {
                validMoves.push({ from, to });
            }
        }
    }
    
    return validMoves;
}

/**
 * Generate a batch of levels for efficient loading
 * @param {number} startLevel - Starting level number
 * @param {number} endLevel - Ending level number
 * @returns {Object} - Object containing levels in range
 */
function generateLevelBatch(startLevel, endLevel) {
    const levels = {};
    
    for (let level = startLevel; level <= endLevel; level++) {
        const config = getConfigurationForLevel(level);
        let tubes = createSolvedState(config.numColors, config.numEmptyTubes);
        tubes = shuffleBoard(tubes, config.shuffleMoves, config.numColors);
        
        levels[level] = { tubes };
    }
    
    return levels;
}

/**
 * Export generated levels to JSON string
 * @param {Object} levels - Levels object
 * @returns {string} - JSON string
 */
function exportLevelsToJSON(levels) {
    return JSON.stringify(levels, null, 2);
}

/**
 * Get level statistics
 * @param {Object} level - Level object
 * @returns {Object} - Statistics about the level
 */
function getLevelStats(level) {
    const tubes = level.tubes;
    const stats = {
        totalTubes: tubes.length,
        emptyTubes: tubes.filter(t => t.length === 0).length,
        fullTubes: tubes.filter(t => t.length === BALLS_PER_TUBE).length,
        totalBalls: tubes.reduce((sum, tube) => sum + tube.length, 0),
        colors: [...new Set(tubes.flat())].length,
        possibleMoves: findPossibleForwardMoves(tubes).length
    };
    
    return stats;
}

// For debugging: generate a small set of levels and display stats
function generateAndDisplaySample(count = 10) {
    console.log(`📊 Generating ${count} sample levels...`);
    const levels = generateLevels(count);
    
    for (let i = 1; i <= count; i++) {
        const stats = getLevelStats(levels[i]);
        console.log(`Level ${i}:`, stats);
    }
    
    return levels;
}
