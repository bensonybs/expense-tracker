const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js') //Import restaurant model

//Get all restaurants
router.get('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort({ '_id': 'asc' })
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.log(error))
})
//Search for restaurants
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  //Search in mongodb for restaurant name
  Restaurant.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})
//Sorting the restaurants
router.get('/sorting', (req, res) => {
  const sortBy = req.query.by
  const order = req.query.order
  const sortCondition = {}
  sortCondition[sortBy] = order
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort(sortCondition)
    .then(restaurants => { res.render('index', { restaurants }) })
    .catch(error => console.log(error))
})

module.exports = router