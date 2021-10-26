'use strict'

const express = require('express')
const authRouter = express.Router()

const { users } = require('../models/index')
const { acl, basic, bearer } = require ('../middleware/auth')

authRouter.post('/signup', async (req, res, next) => {
  try {
    res.status(201).json(await users.create(req.body))
  } catch (e) {
    next(e.message)
  }
})

authRouter.post('/signin', basic(users), async (req, res) => {
  const user = {
    username: req.user.username,
    token: req.user.token,
    id: req.user.id
  }
  res.status(200).json(user)
})

authRouter.get('/users', bearer(users), acl('delete'), async (req, res) => {
  const foundUsers = await users.findAll()
  const list = foundUsers.map(user => user.username)
  res.status(200).json(list)
})

authRouter.get('/secret', bearer(users), async (req, res) => {
  res.status(200).send('Welcome to the secret area!')
})


module.exports = authRouter
