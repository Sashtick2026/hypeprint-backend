// Product model
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  price: Number,
  description: String,
  image_url: String
})

module.exports = mongoose.model('Product', productSchema)