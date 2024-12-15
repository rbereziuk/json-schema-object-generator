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
      return Math.floor(Math.random() * 100);
    case 'string':
      return 'random string';
  }
}

console.log(generateRandomObject(schema));
