// καλώ τη βιβλιοθήκη express
const express = require('express');
const app = express();

// ορίζω port για τον web server
const port = 3000;

// Σύνδεση με τη NoSql DB (MongoDB)
const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.json());

// καλώ τον swagger (για documentation)
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');


// σύνδεση με τη ΒΔ
mongoose.connect(process.env.MONGODB_URI)
   .then(
      () => {console.log('Connection to MongoDB established')},
      err => {console.log('Failed to connect to MongoDb', err)}
   );

const cors = require('cors');
const user = require('./routes/user.route');
const userProduct = require('./routes/user.products.route');

// cross origin, από πού επιτρέπω κλήσεις πέρα από τον native web server
app.use(cors({
   origin: ['http://localhost:8000/']     // ή * για όλους
}));

app.use('/', express.static('files'));

// κλήσεις
app.use('/api/users', user);
app.use('/api/user-products', userProduct);

app.use('/api-docs', 
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocument.option)
)

// Ξεκινάει έναν web server
// Το έχω μεταφέρει στο αρχείο server.js
// app.listen(port, () => {
//    console.log(`Server is listening on port ${port}`);
// })

module.exports = app;