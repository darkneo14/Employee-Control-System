var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var EmployeeSchema = mongoose.Schema({
    name : String,
    age : Number,
    salary : Number,
    jobstatus : String,
    employer : String
});

module.exports=mongoose.model('Employee',EmployeeSchema);