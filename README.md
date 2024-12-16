# JSON-Schema-Based Random Object Generator

## Overview

This project implements a JavaScript function, generateRandomData, that generates random data objects conforming to a provided JSON Schema. The function is lightweight, dependency-free, and adheres strictly to schema constraints such as data types, value ranges, required properties, and more

## Features

- **Primitive Types**: Supports `integer`, `number`, `string`, and `boolean` types.
- **Array and Object Support**: Generates arrays and nested objects based on the schema.
- **Constraint Handling**: Complies with constraints like `minimum`, `maximum`, `minLength`, `maxLength`, `required`, `uniqueItems`.
- **No External Libraries**: Pure JavaScript implementation.

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd <project-directory>

# Run tests to verify functionality
node test.js
```

## Usage

### Generating Random Data

Use the `generateRandomData` function by passing a JSON Schema as an argument:

```javascript
const generateRandomData = require('./index');

const schema = {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: { type: 'string', minLength: 3 },
    age: { type: 'integer', minimum: 0 },
  },
};

const randomObject = generateRandomData(schema);
console.log(randomObject);
```

### Example Output

Given the above schema, the output might look like:

```JSON
{
    "id": 42,
    "name": "JohnDoe",
    "age": 25
}
```

## Tests

Comprehensive unit tests are included to validate the function against various JSON Schema scenarios. Tests cover:

- Type compliance (integer, number, string, boolean).
- Constraint adherence (min/max values, lengths, required properties).
- Array generation (length constraints, unique items).
- Nested object generation.

### Running Tests

`node test.js`

## API Documentation

`generateRandomData(schema)`
Generates random data based on the provided JSON Schema.

**Parameters**

- `schema` (Object): JSON Schema object defining the constraints.

**Returns**

- The generated random data object, array, or primitive type conforming to the schema.

### Constraints Supported

- Primitive types: `integer`, `number`, `string`, `boolean`.
- Array: `minItems`, `maxItems`, `uniqueItems`, nested items schemas.
- Object: `properties`, `required`, nested schemas.
- String: `minLength`, `maxLength`.
- Numeric: `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`.
