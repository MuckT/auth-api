'use strict'

require('dotenv').config

const server = require('./src/server')

// Contains All Models
const { db } = require('./src/models/index')

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3001)
  })
  .catch(console.error)
