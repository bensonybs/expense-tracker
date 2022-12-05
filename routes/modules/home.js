const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//Get all records
router.get('/', (req, res) => {
  const categoryId = req.query.filter
  const userId = req.user._id
  const query = categoryId ? { userId, categoryId } : { userId }
  console.log(query)
  return Promise.all([
    Record.find(query).lean().sort({ '_id': 'asc' }),
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
      })
      // Response
      res.render('index', { records, totalAmount, categories })
    })
    .catch(error => console.log(error))
  })
  router.get('/test', (req, res, next) => {
    Record.aggregate([
      {
        $lookup: {
          from: "categories",
          as: "categoryy",
          let: {categoryId: "$_id"},
          pipeline: [
            {$match: {$expr: {$eq: ['$categoryId', '$$categoryId']}}}
          ]
        }
      },
      { $project: {
        _id: 1,
        name: 1,
        amount: 1,
      }}
    ]).then(result => console.log(result))
  })

  module.exports = router