const izit = require('./lib/index.js')

const check = izit('testt').array()

if (check.hasErrors()) {
  console.log(check.getErrors())
}
