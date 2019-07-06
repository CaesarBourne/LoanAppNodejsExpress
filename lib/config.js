/* 
create andexport configuration varaible
*/

var config = {}

config.loan_plans = {
 
  renmoney : {
    description : "Salary earners discounted loan",
    intrestrate :  "3%",
    amount : "50000",
    tenure : 47304000000//1000 * 60 * 60 *24 * 547.5 time in milliseconds
      },
      kiakia :  {
        description : "Easy small loan",
        intrestrate :  "5%",
        amount : "5000",
        tenure : 777600000 //1000 * 60 * 60 *24 *90 time in milliseconds
      }
}



module.exports = config;