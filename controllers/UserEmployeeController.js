var User = require ('../models/User');
var Employee = require('../models/Employee');
var config = require('../config');

var jsonwebtoken = require('jsonwebtoken');
//Function to create a new access token with vaiddity of 1 day
function createToken(user) {

    var token = jsonwebtoken.sign({
        _id: user._id,
        name: user.name,
        email: user.email},
        config.superSecret, 
        {expiresIn : 60*60*24}
    );
    return token;
}

module.exports = {
		//Function t=for login route
      login : function (req, res, next) {
        User.findOne({'email': req.body.email}).select('password').exec(function (err, user) {
            if (err)
                throw err;
            if (!user) {
                res.json({message: "User doesn't exist", success: false, userprofile: user});
            } else if (user) {
            	//comparing passwords
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({message: "Invalid Password", success: false})
                }
                else {
                	//at every login updating the token validity to 5 requests
                	user.accesscount = 5;
                	user.save( function(err) {
                		if(err){
                			res.json({message: "Error Occured!! Plz Try Again", success: false})
                		}
                		else{
                			var token = createToken(user);
		                    res.json({
		                        success: true,
		                        message: "Successfully login",
		                        token: token,
		                        userid: user._id
		                    });
                		}
                	})
                    
                }
            }
        });
      },
      //function to add new admin
      signup : function(req,res,next){
        var user = new User();

          user.name = req.body.name;
          user.email = req.body.email;
          user.password = req.body.password;

          user.save(function (err) {
              if (err) {
                  if (err.code == 11000)
                      return res.json({message: "User with this email already exist ", success: false});
                  else {
                      console.log(err);
                      return res.json({message: "User not created", success: false});
                  }
              }
              else{
                return res.json({message: "User created Successfully!", success: true});
              }
          });
      },
      //function to add new Employee
      addEmployee : function(req, res, next) {
      	var employee = new Employee();
      	employee.employer = req.decoded._id;
      	employee.name = req.body.name;
      	employee.age = req.body.age;
      	employee.salary = req.body.salary;
      	employee.jobstatus = req.body.jobstatus;

      	employee.save( function (err) {
      		if(err) {
      			return res.json({message: "Employee creation failed!! Please try again.", success: false});
      		}
      		else{
      			return res.json({message: "Employee added successfully!!", success: true});
      		}
      	})
      },
      //function to ge all employee for logged in user
      getAllEmployee : function(req, res, next) {
      	var userId = req.decoded._id;
      	Employee.find({employer : userId}, function(err, employee) {
      		if(err){
      			return res.json({message: "Error finding employee for logged in user!!", success: false});
      		}
      		else{
      			return res.json({data: employee, success: true});
      		}
      	})
      },
      //function to update the access token. called after every api call and reduces the access token count by 1.
      updateAccessToken : function(id, callback) {
      	User.findById(id).select('accesscount').exec( function(err, user) {
      		if(err){
      			callback(err);
      		}
      		else{
      			console.log(user);
      			if(user.accesscount <= 0){
      				callback("error");
      			}
      			else{
      				user.accesscount = user.accesscount - 1;
      				user.save( function (err) {
      					if(err) {
      						callback(err);
      					}
      					else{
      						callback();
      					}
      				})
      			}
      			
      		}
      	})
      }

}