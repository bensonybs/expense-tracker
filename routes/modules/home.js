const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//Get all records
router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .sort({ '_id': 'asc' })
    .then(records => {
      // Calculate total amount
      let totalAmount = records.reduce((total, record) => { return total + record.amount }, 0)
      // Format the value(number and date), use Intl built-in object
      const numFormatter = new Intl.NumberFormat('finance')
      const dateFormater = new Intl.DateTimeFormat('chinese')
      totalAmount = numFormatter.format(totalAmount)
      records.map(record => {
        record.date = dateFormater.format(record.date)
        record.amount = numFormatter.format(record.amount)
      })
      // Response
      return { records, totalAmount }
    })
    .then(results => {
      const { records, totalAmount } = results
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})
//Search for records
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  //Search in mongodb for record name
  Record.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .then(records => res.render('index', { records, keyword }))
    .catch(error => console.log(error))
})

module.exports = router