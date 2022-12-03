module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '登入後才可使用相關功能')
    res.redirect('/users/login')
  }
}