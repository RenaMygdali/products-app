const express = require('express');
const app = express();
const port = 3000;

// Σύνδεση με τη NoSql DB (MongoDB)
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
   .then(
      () => {console.log('Connection to MongoDB established')},
      err => {console.log('Failed to connect to MongoDb', err)}
   );

const user = require('./routes/user.route');
const userProduct = require('./routes/user.products.route');

app.use('/api/users', user)
app.use('/api/user-products', userProduct)

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
})