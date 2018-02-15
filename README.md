# IzitJS

[![GitHub release](https://img.shields.io/github/release/jumastro/izit-js.svg)]()

IzitJS is micro NodeJS data validator

## Install 
```bash
npm install izit-js --save
```

## Example
```javascript
// Import IzitJS module
const IzitJS = require('izit-js')

// Build your test
const test = IzitJS('198.0.0.1').string().min(5).max(20).ipv6()

// Errors handling : Error are detected it need to be an ipv6
if (test.hasErrors()) {
  console.log(test.getErrors())
}
```

## API

### Array
- ```izitArray.array()``` - is array
- ```izitArray.min(length)``` - is min length
- ```izitArray.max(length)``` - is max length
- ```izitArray.length(length)``` - length equal to

### Boolean
- ```izitBoolean.boolean()``` - is boolean
- ```izitBoolean.rtrue()``` - is real true
- ```izitBoolean.rfalse()``` - is real false


### Number
- ```izitNumber.number()``` - is numeric
- ```izitNumber.integer()``` - is integer
- ```izitNumber.float()``` - is float
- ```izitNumber.min(value)``` - is greater than value
- ```izitNumber.max(value)``` - is lower than value
- ```izitNumber.precision(limit, precision)``` - is lower than limit + precision & greater than limit
- ```izitNumber.positive()``` - is positive
- ```izitNumber.negative()``` - is negative
- ```izitNumber.zero()``` - is equal to zero

### Object
- ```izitObject.object()``` - is object
- ```izitObject.has(key)``` - object has prop named key

### String
- ```izitString.string()``` - is string
- ```izitString.min(length)``` - is min length
- ```izitString.max(length)``` - is max length
- ```izitString.notempty()``` - is not empty
- ```izitString.alphanum()``` - is alphanumeric
- ```izitString.email()``` - is email
- ```izitString.hostname()``` - is hostname
- ```izitString.url()``` - is url
- ```izitString.ip()``` - is ipv4 or ipv6
- ```izitString.ipv4()``` - is ipv4 
- ```izitString.ipv6()``` - is ipv6
