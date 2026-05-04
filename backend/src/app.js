const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createCorsOptions } = require('./middleware/corsConfig');
const { sessionCookieMiddleware } = require('./middleware/sessionCookie');
const { errorHandler } = require('./middleware/errorHandler');
const apiRoutes = require('./routes/apiRoutes');

function createApp() {
  const app = express();
  app.use(cors(createCorsOptions()));
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', sessionCookieMiddleware, apiRoutes);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
