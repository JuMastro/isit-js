const izit = require('./lib/index.js')

const check = izit(['test', 'test2']).array().min(100).max(1).length(100)

if (check.hasErrors()) {
  console.log(check.getErrors())
}
