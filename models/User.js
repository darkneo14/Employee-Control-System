var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    name : String,
    password: {type: String, select: false},
    email : {type:String, unique : true },
    accesscount : {type: Number, select: false}
});

UserSchema.pre('save', function(next) {

    var user = this;

    if (!user.isModified('password'))
    {
      return next();
    }

    bcrypt.hash(user.password, null, null, function (err, hash) {
        if(err){
          return next(err);

        }
        user.password = hash;
        next();

    });
});

UserSchema.methods.comparePassword = function(password) {

    var user = this;

    var a = bcrypt.compareSync(password, user.password);

    if (a == true)
        return true;
    else {
        // console.log('error in compare password');
        return false;
    }

}

module.exports=mongoose.model('User',UserSchema);