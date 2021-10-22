'use strict'

// Not Found Handler
const handle500 = (err, req, res, next) => {
  if (res.headersSent) { return next(err) }
  const error = err.message ? err.message : err
  res.status(500)
  res.json({
    status: 500,
    message: error
  })
}

module.exports = handle500