const schema = {
  type: 'objectl',
  properties: {
    productId: {
      description: 'The unique identifier for a product',
      type: 'integer',
    },
    productName: {
      description: 'Name of the product',
      type: 'string',
    },
    price: {
      description: 'The price of the product',
      type: 'number',
      exclusiveMinimum: 0,
    },
    tags: {
      description: 'Tags for the product',
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      uniqueItems: true,
    },
  },
};

function generateRandomObject(schema) {
  const resultObj = {};

  for (const property in schema.properties) {
    resultObj[property] = generateRandomData(schema.properties[property]);
  }

  return resultObj;
}

function generateRandomData(propertySchema) {
  switch (propertySchema.type) {
    case 'integer':
    case 'number':
      return generateRandomNumber(propertySchema);
    case 'string':
      return generateRandomString();
    case 'array':
      return generateRandomArray(propertySchema);
  }
}

function generateRandomNumber(schemaPart) {
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

  return randomNumber;
}

function generateRandomString(schemaPart) {
  const min = schemaPart?.minLength || 1;
  const max = schemaPart?.maxLength || 25;
  const letters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  const stringLength = Math.floor(Math.random() * (max - min) + min);

  for (let i = 0; i <= stringLength; i++) {
    const randomLetterIndex = Math.floor(Math.random() * letters.length);

    result = result + letters[randomLetterIndex];
  }

  return result;
}

function generateRandomArray(schemaPart) {
  const minItems = 1;
  const maxItems = 5;
  const result = [];

  for (let i = 0; i <= maxItems; i++) {
    result[i] = generateRandomData(schemaPart.items);
  }

  return result;
}

console.log(generateRandomObject(schema));
