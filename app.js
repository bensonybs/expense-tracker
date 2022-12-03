const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport.js')
const flash = require('connect-flash')
const routes = require('./routes')
const app = express()

// Set environment variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Set mongoose
require('./config/mongoose.js')
// Set method override
app.use(methodOverride('_method'))
// Set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// Set body parser
app.use(express.urlencoded({ extended: true }))
// Set static file
app.use(express.static('public'))
// Set session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, //強制將session更新到session store內，參考 https://www.npmjs.com/package/express-session#resave
  saveUninitialized: true //強制將未初始化的session存回store內，參考 https://www.npmjs.com/package/express-session#saveuninitialized
}))
// Set passport
usePassport(app)
// Set Flash message
app.use(flash())

// Set locals middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// Set routes
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Express is running on http://localhost:${process.env.PORT}`);
})