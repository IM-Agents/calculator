function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }

  const status = error.status || 500
  res.status(status).json({
    code: error.code || 'INTERNAL_ERROR',
    message: error.message || 'Unexpected server error.'
  })
}

module.exports = { errorHandler }
