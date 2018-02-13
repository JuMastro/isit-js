const izit = require('./lib/index.js')

const test = ['test', 'test2']
const check = izit(test).array().min(100).max(1).length(100)

if (check.hasErrors()) {
  console.log(check.getErrors())
}
