const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, require: true },
  name_en: { type: String, default: '' },
  category: { type: String, default: '其他' },
  image: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/1996/1996055.png' },
  location: { type: String, default: '無' },
  phone: { type: String, default: '無' },
  google_map: { type: String, default: 'https://www.google.com.tw/maps' },
  rating: { type: Number, default: 0 },
  description: { type: String, default: '無' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, require: true }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)