const User = require('../models/user.model');

exports.findAll = async(req, res) => {
   console.log("Find all users' products");

   try {
      const result = await User.find({}, {_id:0, username:1, products:1});
      res.status(200).json({data: result});
      console.log("Success in reading all users' products");
   } catch(err) {
      res.status(400).json({data:err});
      console.log("Problem in reading users' products");
   }
}

exports.findOne = async (req, res) => {
   const username = req.params.username;
   console.log('Find products for user: ', username);
   try {
      const result = await User.findOne({username:username}, {_id:0, username:1, products:1});
      res.status(200).json({data:result});
      console.log('Success in finding products of user: ', username);
   } catch(err) {
      res.status(400).json({data:err});
      console.log("Problem in finding products of user: ", username);
   }
}

exports.create = async(req, res) => {
   const username = req.body.username;
   const products = req.body.products;

   console.log('Inserting products for user: ', username);

   try {
      const result = await User.updateOne(
         {username:username},
         {
            $push: {
               products: products
            }
         }   
      )
      res.status(200).json({data:result});
      console.log('Success inserting products for user: ', username);
   } catch(err) {
      res.status(400).json({data:err});
      console.log("Faild to insert products for user: ", username);
   }
}

exports.update = async(red, res) => {
   const username = req.params.username;
   const id = req.body.product._id;
   const quantity = req.body.product.quantity;

   console.log('Update product for user: ', username);

   try {
      const result = await User.updateOne(
         {username:username, "products._id": id},
         {
            $set: {
               "products.$.quantity": quantity
            }
         }
      )
      res.status(200).json({data:result})
      console.log("Success updating product for user:", username)
   } catch(err) {
      res.status(400).json({data:err})
      console.log('Problem updating product for user: ', username)
   }
}

exports.delete = async(req, res) => {
   const username = req.params.username;
   const productId = req.params.id;

   console.log('Delete product for user: ', username);

   try {
      const result = await User.updateOne(
         {username:username},
         {
            $pull: {
               products: {_id:id}
            }
         }
      )
      res.status(200).json({data:result});
      console.log("Success in deleting product for user: ", username);
   } catch(err) {
      res.status(400).json({data:err})
      console.log("Problem deleting product for user: ", username);
   }
}