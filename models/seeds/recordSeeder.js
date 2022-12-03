const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose.js')
const SEED_CATEGORIES = require('./category.json')
const SEED_USERS = require('./user.json')
const SEED_RECORDS = require('./record.json')
const DROP_OLD_COLLECTIONS = false //Only for develope
db.once('open', () => {
  if (DROP_OLD_COLLECTIONS) {
    async function DropOldCollections() {
      try {
        await Record.collection.drop()
        await User.collection.drop()
        console.log('Drop old collections successfully.')
      }
      catch (err) {
        console.log(err)
      }
    }
    DropOldCollections()
  }
  Promise.all(SEED_USERS.map(seedUser => {
    const { name, email, password } = seedUser
    const user_id = seedUser.id // User id from user.json
    return User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    })
      .then(user => {
        // filter records of the user
        const records = SEED_RECORDS.filter(record => record.user_id === user_id)
        // set record.userId = user._id
        records.map(record => record.userId = user._id)
        return records
      })
      .then(records => {
        // find categoryId of each record by its category name 
        return Promise.all(records.map(record => {
          // find categoryname with category_id
          const name = SEED_CATEGORIES.find(category => category.id === record.category_id).name
          // query the database
          return Category.findOne({ name })
            .then(category => {
              // set record.categoryId = category._id
              record.categoryId = category._id
              return record
            })
        }))
      })
      .then(records => {
        return Record.insertMany(records)
      })
  }))
    .then(() => console.log('Import seed user and record successfully.'))
    .catch(err => console.log(err))
    .finally(() => {
      console.log('Process of record and user seeder end.\n')
      db.close()
      process.exit()
    })
})