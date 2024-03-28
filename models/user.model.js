const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let addressSchema = new Schema({
   area: { type: String },
   road: { ype: String }
}, {_id: false})

let phoneSchema = new Schema({
   type: { type: String },
   number: { type: Number }
}, {_id: false})

let productsSchema = new Schema({
   product: { type: String },
   cost: { type: Number },
   quantity: { type: Number },
   date: { type: Date, default: Date.now }
}, {_id: true})

let userSchema = new Schema({
   username: {
      type: String,
      required: [true, 'Username is required'],
      maxLength: [20, 'Username must have less than 20 characters'],
      unique: true,
      trim: true,
      lowercase: true
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must have more than 6 characters'],
      maxLength: [20, 'Password must have less than 20 characters']
   },
   name: { type: String },
   surname: { type: String },
   email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid']
   },
   address: addressSchema,
   phone: { type: [phoneSchema], null: true },
   products: { type: [productsSchema], null: true}
}, {
   collection: 'users',
   timestamps: true
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)