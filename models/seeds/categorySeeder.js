const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose.js')
const SEED_CATEGORIES = require('./category.json')
const DROP_OLD_COLLECTIONS = true
db.once('open', () => {
  async function DropOldCollections() {
    await Category.collection.drop()
    console.log('Drop old collections successfully.')
  }
  if (DROP_OLD_COLLECTIONS) {
    DropOldCollections()
  }
  Category.insertMany(SEED_CATEGORIES)
    .then(() => console.log('Seed category imported.'))
    .catch(err => console.log(err))
    .finally(() => {
      console.log('End of category seeder process')
      process.exit()
    })
})