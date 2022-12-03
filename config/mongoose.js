const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongo connect error!')
})
db.once('open', () => {
  console.log('mongo connected!')
})

module.exports = db