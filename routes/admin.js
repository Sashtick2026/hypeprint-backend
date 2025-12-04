// Admin routes
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const Product = require('../models/Product')
const Order = require('../models/Order')

// Admin Login
router.post('/login', async (req,res)=>{
  const {email,password} = req.body
  const admin = await Admin.findOne({email})
  if(!admin) return res.status(401).json({error:'Invalid credentials'})
  if(password!==admin.password) return res.status(401).json({error:'Invalid credentials'}) // Use bcrypt in real
  const token = jwt.sign({id:admin._id}, 'SECRET_KEY', {expiresIn:'1d'})
  res.json({token})
})

// Get stats
router.get('/stats', async (req,res)=>{
  const products = await Product.countDocuments()
  const orders = await Order.countDocuments()
  const users = 10 // replace with Users.countDocuments()
  res.json({products, orders, users})
})

module.exports = router