const Restaurant = require('../restaurant.js') //Import restaurant model
const User = require('../user.js')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose.js')
const SEED_RESTAURANTS = require('./restaurant.json').results
const SEED_USERS = require('./user.json')
db.once('open', () => {
  Promise.all(SEED_USERS.map(seedUser => {
    let { name, email, password, restaurants } = seedUser
    return User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    }).then(user => {
      return Promise.all(SEED_RESTAURANTS.map(seed_restaurant => {
        if (restaurants.includes(seed_restaurant.id)) {
          seed_restaurant.userId = user._id
          return Restaurant.create(seed_restaurant)
        }
        return true
      }))
    })
  }))
    .then(() => console.log('Import seed data successfully.'))
    .catch(err => console.log(err))
    .finally(() => {
      console.log('Process end.')
      db.close()
      process.exit()
    })
})
// for (const data of SEED_RESTAURANTS.results) {
//   Restaurant.create({
//     name: data.name,
//     name_en: data.name_en,
//     category: data.category,
//     image: data.image,
//     location: data.location,
//     phone: data.phone,
//     google_map: data.google_map,
//     rating: data.rating,
//     description: data.description,
//   })
// }