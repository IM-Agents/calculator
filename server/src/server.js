import app from './app.js';

const PORT = Number(process.env.PORT) || 3001;
// test
app.listen(PORT, () => {
  console.log(`Calculator API listening on http://localhost:${PORT}`);
});
