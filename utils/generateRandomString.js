const getRandomNumberInRange = require('./getRandomNumberInRange');

/**
 * Utility function to generate a random string.
 * @param {number} min - min string length
 * @param {number} max - max string length
 */
function generateRandomString(min = 1, max = 5) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  const stringLength = getRandomNumberInRange(min, max);

  for (let i = 0; i <= stringLength; i++) {
    const randomCharacterIndex = Math.floor(Math.random() * characters.length);

    result = result + characters[randomCharacterIndex];
  }

  return result;
}

module.exports = generateRandomString;
