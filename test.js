var assert = require('assert');
const generateRandomData = require('./index');

function runTests() {
  console.log('Running tests for generateRandomData...');

  // Test: Generate integer wihing range
  const integerSchema = { type: 'integer', minimum: 5, maximum: 10 };
  const randomInt = generateRandomData(integerSchema);
  assert(
    Number.isInteger(randomInt),
    'Failed: Random integer is not an integer.',
  );
  assert(
    randomInt >= 5 && randomInt <= 10,
    'Failed: Random integer out of range.',
  );
  console.log('Test passed: Integer generation.');

  // Test: Generate number withing range
  const numberSchema = { type: 'number', minimum: 1.5, maximum: 3.5 };
  const randomNumber = generateRandomData(numberSchema);
  assert(
    typeof randomNumber === 'number',
    'Failed: Random number is not a number.',
  );
  assert(
    randomNumber >= 1.5 && randomNumber <= 3.5,
    'Failed: Random number out of range.',
  );
  console.log('Test passed: Number generation.');

  // Test: Generate string withing length
  const stringSchema = { type: 'string', minLength: 3, maxLength: 15 };
  const randomString = generateRandomData(stringSchema);
  assert(
    typeof randomString === 'string',
    'Failed: Random string is not a string.',
  );
  assert(
    randomString.length >= 3 && randomString.length <= 15,
    'Failed: Random string length out of bounds.',
  );
  console.log('Test passed: String generation.');

  // Test: Generate boolean
  const booleanSchema = { type: 'boolean' };
  const randomBoolean = generateRandomData(booleanSchema);
  assert(
    typeof randomBoolean === 'boolean',
    'Failed: Random boolean is not a boolean',
  );
  console.log('Test passed: Boolean generation.');
}

try {
  runTests();
} catch (error) {
  console.error(error.message);
}
