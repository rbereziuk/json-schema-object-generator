const schema = require('./schemas/test.json');
const generateRandomString = require('./utils/generateRandomString');
const getRandomNumberInRange = require('./utils/getRandomNumberInRange');

/**
 * Generates a random object based on the schema.
 * @param {object} schema - The JSON Schema object.
 * @returns {object} A random object matching to the schema.
 */
function generateRandomObject(schema) {
  const resultObj = {};

  if (!schema.properties) {
    throw new Error('Schema for object properties must be provided.');
  }

  for (const property in schema.properties) {
    // If property not required include with 50% chance
    if (!schema.required?.includes(property) && Math.random() < 0.5) {
      resultObj[property] = generateRandomData(schema.properties[property]);
    }

    if (schema.required?.includes(property)) {
      resultObj[property] = generateRandomData(schema.properties[property]);
    }
  }

  return resultObj;
}

/**
 * Generates random data based on a JSON Schema.
 * @param {object} schema - JSON Schema object.
 * @returns {any} Random data matching the schema.
 */
function generateRandomData(schema) {
  if (!schema || typeof schema !== 'object') {
    throw new Error('Invalid schema provided.');
  }

  switch (schema.type) {
    case 'integer':
    case 'number':
      return generateRandomNumber(schema);
    case 'string':
      return generateRandomString(schema.minLength, schema.maxLength);
    case 'boolean':
      return Math.random() < 0.5;
    case 'array':
      return generateRandomArray(schema);
    case 'object':
      return generateRandomObject(schema);
    default:
      if (schema.enum) {
        return schema.enum[Math.floor(Math.random() * schema.enum.length)];
      }
      throw new Error('Unsupported schema type');
  }
}

/**
 * Generates a random number based on the schema.
 * Supports `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum` shcema constraints.
 * @param {object} schemaPart - The JSON Schema part object.
 * @returns {number} A random number within the range.
 */
function generateRandomNumber(schemaPart) {
  // Handle inclusive and exclusive options for min and max
  const min =
    schemaPart?.minimum !== undefined
      ? schemaPart.minimum
      : schemaPart?.exclusiveMinimum !== undefined
        ? schemaPart.exclusiveMinimum + 1
        : 0;

  const max =
    schemaPart?.maximum !== undefined
      ? schemaPart.maximum
      : schemaPart?.exclusiveMaximum !== undefined
        ? schemaPart.exclusiveMaximum - 1
        : 100;

  const randomNumber = Math.random() * (max - min) + min;

  if (schemaPart.type === 'integer') {
    return Math.floor(randomNumber);
  }

  return parseFloat(randomNumber.toFixed(2));
}

/**
 * Generates a random array based on the schema.
 * Supports `minItems`, `maxItems` and `uniqueItems` schema constraints.
 * @param {object} schemaPart - The JSON Schema part object.
 * @returns {Array} A random array matching to the schema.
 */
function generateRandomArray(schemaPart) {
  const minItems =
    schemaPart?.minItems !== undefined || schemaPart?.minItems > 0
      ? schemaPart.minItems
      : 1;
  const maxItems = schemaPart?.maxItems !== undefined ? schemaPart.maxItems : 3;
  const result = [];
  const itemsInArray = getRandomNumberInRange(minItems, maxItems);

  while (result.length < itemsInArray) {
    const item = generateRandomData(schemaPart.items);
    if (schemaPart.uniqueItems) {
      if (!result.includes(item)) {
        result.push(item);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

module.exports = generateRandomData;
