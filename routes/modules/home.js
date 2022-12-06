const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

//Get all records
router.get('/', (req, res) => {
  const categoryId = req.query.filter
  const userId = req.user._id
  const query = categoryId ? { userId, categoryId } : { userId }
  Promise.all([
    Record.find(query).lean(),
    Category.find().lean()
  ])
    .then(([records, categories]) => {
      // Calculate total amount
      let totalAmount = records.reduce((total, record) => { return total + record.amount }, 0)
      // Format the value(number and date), use Intl built-in object
      const numFormatter = new Intl.NumberFormat('finance')
      const dateFormater = new Intl.DateTimeFormat('sv-SE')
      totalAmount = numFormatter.format(totalAmount)
      records.map(record => {
        record.date = dateFormater.format(record.date)
        record.amount = numFormatter.format(record.amount)
        const category = categories.find(category => {
          return category._id.equals(record.categoryId)
        })
        record.category = category.name
        record.categoryIcon = category.icon
      })
      // Response
      res.render('index', { records, totalAmount, categories })
    })
    .catch(err => console.log(err))
})
module.exports = router