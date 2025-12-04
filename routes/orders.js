// Orders routes
const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

// Create order
router.post('/', async (req,res)=>{
  try{
    const { productId, quantity, name, phone, address, paymentMethod, transactionId } = req.body
    const newOrder = new Order({
      productId,
      quantity,
      name,
      phone,
      address,
      paymentMethod,
      transactionId,
      status: 'Pending',
      createdAt: new Date()
    })
    await newOrder.save()
    res.json({message:'Order placed successfully'})
  }catch(err){
    res.status(500).json({error:'Server error'})
  }
})

module.exports = router
// Get all orders for current user (dummy userId = 1)
router.get('/my', async (req,res)=>{
  try{
    const userId = req.userId || '1' // Replace with JWT auth
    const orders = await Order.find({ userId }).populate('productId')
    const formatted = orders.map(o=>({
      _id: o._id,
      productTitle: o.productId.title,
      price: o.productId.price,
      quantity: o.quantity,
      status: o.status,
      transactionId: o.transactionId,
      createdAt: o.createdAt
    }))
    res.json(formatted)
  }catch(err){
    res.status(500).json({error:'Server error'})
  }
})

// Cancel Order
router.patch('/:id/cancel', async (req,res)=>{
  try{
    const order = await Order.findById(req.params.id)
    if(!order) return res.status(404).json({error:'Order not found'})
    order.status = 'Cancelled'
    await order.save()
    res.json({message:'Order cancelled'})
  }catch(err){
    res.status(500).json({error:'Server error'})
  }
})
