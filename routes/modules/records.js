const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// Create new record page
router.get('/new', (req, res) => {
  return Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})
// Create new record
router.post('/', (req, res) => {
  // Add user id
  req.body.userId = req.user._id
  console.log(req.body)
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// Update record
router.get('/:record_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
router.put('/:record_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  Record.findOne({ _id, userId })
    .then(record => {
      record = req.body
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})
// Delete record
router.delete('/:record_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  Record.findOne({ _id, userId })
    .then(record => { return record.remove() })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})


module.exports = router