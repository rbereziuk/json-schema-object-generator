const getRandomNumberInRange = require('./getRandomNumberInRange');

/**
 * Utility function to generate a random string.
 * Without arguments function returns random character string with random length between 1 and 5.
 * @param {number} min - min string length.
 * @param {number} max - max string length.
 * @returns {string} A random generated string.
 */
function generateRandomString(min = 1, max = 5) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  // Handle out of range values
  if (min <= 0) min = 1;
  if (max > 255) max = 255;

  const stringLength = getRandomNumberInRange(min, max);

  for (let i = 0; i < stringLength; i++) {
    const randomCharacterIndex = Math.floor(Math.random() * characters.length);

    result = result + characters[randomCharacterIndex];
  }

  return result;
}

module.exports = generateRandomString;
