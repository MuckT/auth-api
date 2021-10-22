'use strict'

// 3rd Party Resources
const express = require('express')
const cors = require('cors')

// Esoteric Resources
const errorHandler = require('./error-handlers/500')
const notFound = require('./error-handlers/404')
const authRoutes = require('./routes/auth')

// Prepare the express app
const app = express()

// App Level Middleware
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Bad route
app.get('/bad', (req, res, next) => {
  next('you\'ve messed up')
});

// Routes
app.use(authRoutes)

// Catchalls
app.use(notFound)
app.use(errorHandler)

// Export modules
module.exports = {
  server: app,
  start: port => app.listen(port, console.log(`Server started on Port ${port}`))
}
