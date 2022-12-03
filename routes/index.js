const express = require('express') 
const restaurants = require('./modules/restaurants')
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth.js')
const router = express.Router()

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
module.exports = router