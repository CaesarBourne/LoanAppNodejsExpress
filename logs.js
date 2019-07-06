const moment = require("moment");

const logs = (req,res, next)=>{
    console.log(`${req.originalUrl} ${moment().format()}`);
    next();
}
module.exports = logs;