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
      return generateRandomNumber();
    case 'string':
      return generateRandomString();
  }
}

function generateRandomNumber(schemaPart) {
  const min = schemaPart?.minimum || 0;
  const max = schemaPart?.maximum || 100;
  return Math.floor(Math.random() * (max - min) + min);
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

console.log(generateRandomObject(schema));
