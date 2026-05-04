const { createApp } = require('./app');

const PORT = Number.parseInt(process.env.PORT || '3001', 10);

const app = createApp();
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Calculator API listening on http://localhost:${PORT}`);
});
