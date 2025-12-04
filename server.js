// Backend server code
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Connect MongoDB
mongoose.connect('mongodb+srv://HP_Swastik:<db_password>@hypeprint.skbmuip.mongodb.net/?appName=HypePrint', {
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log('MongoDB connected'))

// Routes
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/admin', require('./routes/adminOrders'))

app.listen(5000, ()=>console.log('Server running on port 5000'))