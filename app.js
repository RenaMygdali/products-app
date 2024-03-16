const express = require('express');
const app = express();
const port = 3000;

// Σύνδεση με τη NoSql DB (MongoDB)
const mongoose = require('mongoose');

app.use(express.json());

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

mongoose.connect(process.env.MONGODB_URI)
   .then(
      () => {console.log('Connection to MongoDB established')},
      err => {console.log('Failed to connect to MongoDb', err)}
   );

const user = require('./routes/user.route');
const userProduct = require('./routes/user.products.route');

app.use('/api/users', user);
app.use('/api/user-products', userProduct);
app.use('/api-docs', 
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocument.option)
)

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
})