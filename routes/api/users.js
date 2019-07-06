const express = require("express");
const router = express.Router();
const handlers = require("../../lib/handlers");
const config = require("../../lib/config");
const _data = require("../../lib/data")

router.get("/login", (req, res)=>{
    var firstName = req.query.firstName;
    var password = req.query.password;
    handlers._users.login(firstName, password, function(statuscode, userData){
        res.status(statuscode).send(userData);
    })

})

router.get("/logout", (req, res)=>{
    var token = req.header("token");

    if(token){
     _data.delete("users", token, (err)=>{
         if(!err){
             _data.delete("loans", "loan", (error)=>{
                 if(!err){
                    res.status(200).send({"Success" : "Logout succesful"})
                 }
             })
         }else{
            res.status(400).send({"Error" : "Logout unsuccesful"})
         }
     })
    }
    

})
//return loans
router.get("/loans", (req, res)=>{
    var token = req.header("token");
    //check if the user is registered
    _data.list("users",function(error, arrayOfUsers){
        if(!error && arrayOfUsers.indexOf(token) > -1){
            res.json(config.loan_plans);
        }else{
            res.send("You are not a authenticated user")
        }
    })
    

});

router.post("/apply", (req,res)=>{
    let token = req.header("token");
    let loantype = req.body("token");
    //get the names of the loan plans  in config
    let arrayofLoans = Object.keys(config.loan_plans);
       //check if the user is listed
       _data.list("users",function(error, arrayOfUsers){
        if(!error && arrayOfUsers.indexOf(token) > -1){
            //if loantype name is valid
            if(arrayofLoans.indexOf(loantype) > -1){
             //check if user still has loaan inow
             _data.read("users", phone, function (err, userData) {
                userData.loans[loantype]
            })
            }else{
                res.status(400).send("Please select a valid loan plan");
            }
           
        }else{
            res.status(403).send("You are not a authenticated user");
        }
    })
   
})
//create user
router.post("/", (req, res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
    var password = req.body.password;
    var tosAgreement = true;
    handlers._users.register(firstName,lastName,phone, password, tosAgreement, function(statuscode, message){
        res.status(statuscode).json(message)
    });
})
module.exports = router;