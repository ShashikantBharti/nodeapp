const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const DatabaseConnect = require('./Config/db.mongoose');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//routes here
app.use(require('./routes/admin_api_routes'));
app.use(require('./routes/customer.routes'));
// 404 page
app.use((req, res, next) => {
  const error = new Error('Routes Not Found');
  res.status(404).json({
    status: false,
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`server is Listing on the PORT${PORT}`);
  DatabaseConnect();
});
