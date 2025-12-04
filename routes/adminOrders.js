// Admin orders routes
const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Product = require('../models/Product')

// Get all orders with product info
router.get('/orders', async (req,res)=>{
  const orders = await Order.find().populate('productId')
  const formatted = orders.map(o=>({
    _id: o._id,
    productTitle: o.productId.title,
    quantity: o.quantity,
    status: o.status,
    transactionId: o.transactionId
  }))
  res.json(formatted)
})

// Update order status
router.patch('/orders/:id', async (req,res)=>{
  const { status } = req.body
  const order = await Order.findById(req.params.id)
  if(!order) return res.status(404).json({error:'Order not found'})
  order.status = status
  await order.save()
  res.json({message:'Order updated'})
})

module.exports = router