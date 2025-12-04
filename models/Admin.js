// Admin model
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Define Admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin'],
    default: 'admin'
  },
  permissions: {
    type: [String], // Example: ['manage_products','manage_orders','manage_admins']
    default: []
  },
  twoFA: {
    enabled: { type: Boolean, default: false },
    secret: { type: String, default: '' }
  }
}, { timestamps: true })

// Password hashing before save
adminSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Password compare method
adminSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('Admin', adminSchema)