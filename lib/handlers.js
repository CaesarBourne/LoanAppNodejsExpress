var _data = require("./data")
var helpers = require("./helpers");
handlers = {};
handlers._users = {};
handlers._loans = {};

handlers._users.register = function (firstName, lastName, phone, password, tosAgreement, callback) {
   
    firstName = typeof (firstName) == 'string' &&  firstName.trim().length > 0 ? firstName.trim() : false;
    lastName = typeof (lastName) == 'string' && lastName.trim().length > 0 ? lastName.trim() : false;
    phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    password = typeof(password) == 'string' && password.trim().length > 0 ? password.trim() : false;
    tosAgreement = typeof (tosAgreement) == 'boolean' && tosAgreement == true ? true : false;
    
  
    if (firstName && lastName && phone && password && tosAgreement) {
  
      // Make sure the user doesnt already exist
      _data.read('users', phone, function (err, data) {
        if (err) {
          // Hash the password
          var hashedPassword = helpers.hash(password);
  
          // Create the user object
          if (hashedPassword) {
            var userObject = {
              'firstName': firstName,
              'lastName': lastName,
              'phone': phone,
              'token': hashedPassword,
              'tosAgreement': true,
              'loans' : {}
            };
  
            // Store the user
            _data.create('users', hashedPassword, userObject, function (err) {
              if (!err) {
                callback(200, {Success: "User Registered"});
              } else {
                console.log(err);
                callback(500, { Error: "Could not create the new user, try later"});
              }
            });
          } else {
            callback(500, {Error :"Could not hash the user\'s password."});
          }
  
        } else {
          // User already exists
          callback(400, {"Error" : "A user with that phone number already exists"});
        }
      });
  
    } else {
      callback(400, {"Error" : `Missing a required field ${tosAgreement}`});
    }
  
  };

  handlers._users.login = function (firstName, password, callback) {
    // Check that phone number is valid
    firstName = typeof (firstName) == 'string' &&  firstName.trim().length > 0 ? firstName.trim() : false;
    password = typeof(password) == 'string' && password.trim().length > 0 ? password.trim() : false;
    if (firstName && password) {
      //verify that te authorised user is logged in, verified user would have atoken in its header
      var hashedPassword = helpers.hash(password);
        if (hashedPassword) {
          // Lookup the user
          _data.read('users', hashedPassword, function (err, data) {
            if (!err && data) {
              // Remove the hashed password from the user user object before returning it to the requester
            //   delete data.hashedPassword;
              callback(200, data);
            } else {
              callback(404);
            }
          });
        } else {
          callback(500, {
            "Error": "Internal server error"
          });
        }
     
  
  
    } else {
      callback(400, {
        'Error': `Missing required field ${firstName}`
      })
    }
  };
  


module.exports = handlers