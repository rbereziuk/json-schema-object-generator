/**
 * Generate random integer number in given range.
 * Without params function return random number between 1 and 100.
 * @param {number} min - Minimum inclusive number
 * @param {number} max - Maximum inclusive number
 */
function getRandomNumberInRange(min = 0, max = 100) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

module.exports = getRandomNumberInRange;
