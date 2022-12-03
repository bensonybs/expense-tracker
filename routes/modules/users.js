const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// GET: Regitster Page
// POST: Register New User
router.route('/register')
  .get((req, res, next) => {
    res.render('register')
  })
  .post((req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    // Check register data
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位皆為必填' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不同，請重新輸入' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    User.findOne({ email }).then(user => {
      // Check user existence
      if (user) {
        errors.push({ message: '此 Email 已被註冊過，請重新輸入' })
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => { res.redirect('/') })
        .catch(err => console.log(err))
    })
      .catch(err => console.log(err))
  })
// GET: Login page
// POST: User login
router.route('/login')
  .get((req, res, next) => {
    res.render('login')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }))
// GET: User logout
router.route('/logout')
  .get((req, res, next) => {
    req.logout()
    req.flash('success_msg', '系統已成功登出')
    res.redirect('/users/login')
  })

module.exports = router
