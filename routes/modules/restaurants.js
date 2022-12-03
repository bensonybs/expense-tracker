const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js') //Import restaurant model

//Create new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  //Delete property of restaurant object with empty input value
  for (let prop in req.body) {
    if (req.body[prop] === '') {
      delete req.body[prop]
    }
  }
  // Add user id
  req.body.userId = req.user._id
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//Show restaurant detail
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId }) // Change findById() to findOne() to apply multiple query condition
    .lean()
    .then(restaurant => { res.render('show', { restaurant }) })
    .catch(error => console.log(error))
})
//Update restaurant
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      for (let prop in req.body) {
        restaurant[prop] = req.body[prop]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})
//Delete restaurant
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => { return restaurant.remove() })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.log(error))
})


module.exports = router