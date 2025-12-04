// Order model
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref:'Product' },
  quantity: Number,
  name: String,
  phone: String,
  address: String,
  paymentMethod: String,
  transactionId: String,
  status: { type: String, enum: ['Pending','Completed','Cancelled'], default:'Pending' },
  createdAt: Date
})

module.exports = mongoose.model('Order', orderSchema)