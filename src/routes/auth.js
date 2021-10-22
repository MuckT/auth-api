'use strict'

const express = require('express')
const authRouter = express.Router()

const { users } = require('../models/index')
const auth = require ('../middleware/auth')

authRouter.post('/signup', async (req, res, next) => {
  try {
    res.status(201).json(await users.create(req.body))
  } catch (e) {
    next(e.message)
  }
})

authRouter.post('/signin', auth.basic(users), async (req, res, next) => {
  const user = {
    username: req.user.username,
    token: req.user.token,
    id: req.user.id
  }
  res.status(200).json(user)
})

authRouter.get('/users', auth.bearer(users), auth.acl('delete'), async (req, res, next) => {
  const foundUsers = await users.findAll()
  const list = foundUsers.map(user => user.username)
  res.status(200).json(list)
})

authRouter.get('/secret', auth.bearer(users), async (req, res, next) => {
  res.status(200).send('Welcome to the secret area!')
})


module.exports = authRouter
