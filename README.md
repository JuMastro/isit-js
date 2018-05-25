# IzitJS

[![GitHub release](https://img.shields.io/github/release/jumastro/izit-js.svg)]()

IzitJS is nodejs micro data validator

## Install 
```bash
npm install izit-js --save
```

## Example
```javascript
// Import IzitJS module
const IzitJS = require('izit-js')

// Build your test
const test = IzitJS('HelloWorld!').string().min(32).max(64)

// Errors handling : Error is detected it need to be longer than 32.
if (test.hasErrors()) {
  return test.getErrors()
}

```

## API

### Array
- ```izitArray.array()``` - is array
- ```izitArray.minlength(length)``` - is min length
- ```izitArray.maxlength(length)``` - is max length
- ```izitArray.length(length)``` - is length equality
- ```izitArray.hasvalue(value)``` - is include value
- ```izitArray.equal(value)``` - is equal to value

### Boolean
- ```izitBoolean.boolean()``` - is boolean
- ```izitBoolean.rtrue()``` - is real true
- ```izitBoolean.rfalse()``` - is real false

### Float
- ```izitFloat.float()``` - is float
- ```izitFloat.equal(value)``` - is equal to value
- ```izitFloat.min(value)``` - is greater than value
- ```izitFloat.max(value)``` - is lower than value
- ```izitFloat.positive()``` - is positive
- ```izitFloat.negative()``` - is negative
- ```izitFloat.zero()``` - is equal to zero
- ```izitFloat.mindecimal(min)``` - is max of decimals
- ```izitFloat.maxdecimal(max)``` - is min of decimals
- ```izitFloat.decimal(count)``` - is count of decimals

### Integer
- ```izitInteger.integer()``` - is integer
- ```izitInteger.equal(value)``` - is equal to value
- ```izitInteger.min(value)``` - is greater than value
- ```izitInteger.max(value)``` - is lower than value
- ```izitInteger.positive()``` - is positive
- ```izitInteger.negative()``` - is negative
- ```izitInteger.zero()``` - is equal to zero
- ```izitInteger.precision(limit, precision)``` - is valid range

### Object
- ```izitObject.object()``` - is object
- ```izitObject.hasprop(key)``` - is include property
- ```izitObject.haskeyvalue(key, value)``` - is include property with value
- ```izitObject.equal(value)``` - is equal to value

### String
- ```izitString.string()``` - is string
- ```izitString.min(length)``` - is min length
- ```izitString.max(length)``` - is max length
- ```izitString.notempty()``` - is not empty
- ```izitString.alphanum()``` - is alphanumeric
- ```izitString.lowercase()``` - is lowercase
- ```izitString.uppercase()``` - is uppercase
- ```izitString.numeric()``` - is numeric string
- ```izitString.numint()``` - is integer string
- ```izitString.numfloat()``` - is float string
- ```izitString.email()``` - is email
- ```izitString.hostname()``` - is hostname
- ```izitString.url()``` - is url
- ```izitString.ip()``` - is ipv4 or ipv6
- ```izitString.ipv4()``` - is ipv4
- ```izitString.ipv6()``` - is ipv6
- ```izitString.equal(equality)``` - is equal to equality
