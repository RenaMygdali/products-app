const mon2swag = require('mongoose-to-swagger');
const user = require('./models/user.model');
const product = require('./models/product.model');

exports.option = {
   "components": {
      "schemas": {
         User: mon2swag(user),
         Product: mon2swag(product)
      }
   },
   "openapi": "3.1.0",
   "info": {
      "version" : "1.0.0",
      "title" : "Products CRUD API",
      "description": "Products projet application",
      "contact": {
         "name": "API support",
         "url": "http://www.example.com",
         "email": "support@api.com"
      }
   },
   "servers": [
      {
         url: "http://localhost:3000",
         description: "Local Server"
      },
      {
         url: "http://www.example.com",
         description: "Testing Server"
      }
   ],
   "tags": [
      {
         "name": "Users",
         "description": "API endpoints for users"
      },
      {
         "name": "Products",
         "description": "API endpoints for products"
      },
      {
         "name": "Users and Products",
         "description": "API endpoints for users and their products"
      }
   ],
   "paths": {
      "/api/users": {
         "get": {
            "tags": ["Users"],
            "description": "Returns all users",
            "responses": {
               "200": {
                  "description": "A list of users",
                  "content": {
                     "application/json": {
                        "schema": {
                           "type": "array",
                           "items": {
                              "$ref": "#/components/schemas/User"
                           }

                        }
                     }
                  }
               }
            }
         }
      },
      "/api/users/{username}": {
         "get": {
            "tags": ["Users"],
            "parameters": [
               {
                  "name": "username",
                  "in": "path",
                  "required": true,
                  "description": "username of user we want to find",
                  "type": "string"
               }
            ],
            "description": "Get user with specific username",
            "responses": {
               "200": {
                  "description": "User to find",
                  "schema": {
                        "$ref": "#/components/schemas/User"
                  }
               }
            }
         }
      }
   }
}