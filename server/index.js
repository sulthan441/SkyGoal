const express = require('express')
require('dotenv').config();
const db=require('./config/db')

const app = express();
const PORT = process.env.PORT



//connectng to database
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