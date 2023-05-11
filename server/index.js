const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', authMiddleware.verifyToken, userRoutes);

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
