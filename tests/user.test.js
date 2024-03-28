//κάνω τη σύνδεση με τη ΒΔ
const mongoose = require('mongoose');

// καλώ τη βιβλιοθήκη που μου επιτρέπει να κάνω requests σε ένα jest αρχείο
const request = require('supertest');

// πού θα βρει το jest τις κλήσεις που έχω; το ορίζω 
const app = require('../app');


const helper = require('../helpers/user.helper');


// για να διαβάσει το jest τις μεταβλητές που έχω στο .env αρχείο
require('dotenv').config();

// πριν από κάθε test ανοίγει το connection με τη ΒΔ
beforeEach(async () => {
   await mongoose.connect(process.env.MONGODB_URI)
      .then(
         () => { console.log("Connection to MongoDB established")},
         err => {console.log("Failed to connect to MongoDB", err)}
      ) 
});

// μετά από κάθε test κλείνει το connection με τη ΒΔ
afterEach(async () => {
   await mongoose.connection.close()
      .then(
         () => {console.log("Connection to MongoDB has been closed")},
         err => {console.log("Failed to close connection with MongoDB", err)}
      )
});

// ομαδοποιώ, όπως νομίζω, τα tests που θέλω να κάνω με το describe
describe("Request GET /api/users", () => {
   test("Returns all users", async() => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
   }, 10000)    // timeout 10secs αν η κλήση δεν απαντάται αμέσως, γιατί θέλει λίγο χρόνο
});

// describe("Request GET /api/users/:username", () => {
//    test("Return a user with the given username", async() => {
//       const res = await request(app).get('/api/users/user2');
//       expect(res.statusCode).toBe(200);
//       expect(res.body.data.username).toBe('user2');
//       expect(res.body.data.email).toBe('user2@aueb.gr');
//    }, 10000)
// })


describe("Request GET /api/users/:username", () => {
   test("Return a user with the given username", async() => {
      const result = await helper.findLastInsertedUser();
      console.log(result);

      const res = await request(app).get('/api/users/' + result.username);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.username).toBe(result.username);
      expect(res.body.data.email).toBe(result.email);
   }, 10000)
});


describe("Request POST /api/users", () => {
   test("Creates a new user", async() => {
      const res = await request(app)
         .post('/api/users')
         .send({
            username: "test1",
            password: "1234567",
            name: "TestName1",
            surname: "TestSur1",
            email: "test1@aueb.gr"
         })
      expect(res.statusCode).toBe(200)
      expect(res.body.data).toBeTruthy();
   }, 10000);


   test("Creates a new user testing password length", async() => {
      const res = await request(app)
         .post('/api/users')
         .send({
            username: "test2",
            password: "12345",
            name: "TestName2",
            surname: "TestSur2",
            email: "test2@aueb.gr"
         })
      expect(res.statusCode).toBe(400)
      expect(res.body.data).toBeTruthy();
   }, 10000);


   test("Creates a new user testing same username and password", async() => {
      const res = await request(app)
         .post('/api/users')
         .send({
            username: "test1",
            password: "1234567",
            name: "TestName3",
            surname: "TestSur3",
            email: "test3@aueb.gr"
         })
      expect(res.statusCode).toBe(400)
      expect(res.body.data).toBeTruthy();
   }, 10000);
})

describe("DELETE /api/users/:username", () => {
   test("Delete the last inserted user", async() => {
      const result = await helper.findLastInsertedUser();
      const res = await request(app)
         .delete('/api/users/' + result.username);
      expect(res.statusCode).toBe(200);
   }, 10000)
})