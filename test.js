var assert = require('assert');
const generateRandomData = require('./index');

function runTests() {
  console.log('⏳ Running tests for generateRandomData...');

  // Test: Generate integer wihing range
  const integerSchema = { type: 'integer', minimum: 5, maximum: 10 };
  const randomInt = generateRandomData(integerSchema);
  assert(
    Number.isInteger(randomInt),
    '🛑 Failed: Random integer is not an integer.',
  );
  assert(
    randomInt >= 5 && randomInt <= 10,
    '🛑 Failed: Random integer out of range.',
  );
  console.log('✅ Test passed: Integer generation.');

  // Test: Generate number withing range
  const numberSchema = { type: 'number', minimum: 1.5, maximum: 3.5 };
  const randomNumber = generateRandomData(numberSchema);
  assert(
    typeof randomNumber === 'number',
    '🛑 Failed: Random number is not a number.',
  );
  assert(
    randomNumber >= 1.5 && randomNumber <= 3.5,
    '🛑 Failed: Random number out of range.',
  );
  console.log('✅ Test passed: Number generation.');

  // Test: Generate string withing length
  const stringSchema = { type: 'string', minLength: 3, maxLength: 15 };
  const randomString = generateRandomData(stringSchema);
  assert(
    typeof randomString === 'string',
    '🛑 Failed: Random string is not a string.',
  );
  assert(
    randomString.length >= 3 && randomString.length <= 15,
    '🛑 Failed: Random string length out of bounds.',
  );
  console.log('✅ Test passed: String generation.');

  // Test: Generate boolean
  const booleanSchema = { type: 'boolean' };
  const randomBoolean = generateRandomData(booleanSchema);
  assert(
    typeof randomBoolean === 'boolean',
    '🛑 Failed: Random boolean is not a boolean',
  );
  console.log('✅ Test passed: Boolean generation.');

  // Test: Generate array with unique items
  const arraySchema = {
    type: 'array',
    minItems: 2,
    maxItems: 5,
    uniqueItems: true,
    items: { type: 'integer', minimum: 1, maximum: 10 },
  };
  const randomArray = generateRandomData(arraySchema);
  assert(
    Array.isArray(randomArray),
    '🛑 Failed: Random array is not an array.',
  );
  assert(
    randomArray.length >= 2 && randomArray.length <= 5,
    'Failed: Random array lenght out of bounds. ',
  );
  assert(
    new Set(randomArray).size === randomArray.length,
    '🛑 Failed: Random array items are not unique.',
  );
  console.log('✅ Test passed: Array generation.');

  // Test: Generate object with required properties
  const objectSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer', minimum: 1 },
      name: { type: 'string', minLength: 5 },
      isActive: { type: 'boolean' },
    },
    required: ['id', 'name'],
  };
  const randomObject = generateRandomData(objectSchema);
  assert(
    typeof randomObject === 'object' && typeof randomObject !== null,
    '🛑 Failed: Generated data is not an object.',
  );
  assert(
    randomObject.hasOwnProperty('id') && randomObject.hasOwnProperty('name'),
    '🛑 Failed: Random object must have id and name properties.',
  );
  assert(
    typeof randomObject.id === 'number',
    '🛑 Failed: Property "id" is not a number.',
  );
  assert(
    typeof randomObject.name === 'string',
    '🛑 Failed: Property "name" is not a string.',
  );

  console.log('🎉 All tests passed!');
}

try {
  for (let i = 0; i <= 3; i++) {
    runTests();
  }
} catch (error) {
  console.error(error.message);
}
