'use strict'

// Not Found Handler
const  handle404 = (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Sorry, we could not find what you were looking for'
  });
}

module.exports =  handle404