 const express = require("express");
 const app =  express();
 const port = process.env.port || 3200;
 const path =  require("path")
 const logs = require("./logs");
 const users = require("./routes/api/users")
 const config =require("./lib/config");
 const _data = require("./lib/data")


app.use(logs);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", users);



let userObject = config.loan_plans;

  // check if loan object is created
  _data.read('loans', "loan", function (err, data) {
    if(err){
      _data.create('loans', "loan", userObject, function (err) {
          if (!err) {
           console.log("loan object created")
          } else {
            console.log(err);
          }
        });
    }

});

 
 
 app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
  })
  module.exports = app;