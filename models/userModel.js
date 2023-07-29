const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:{
        type:String,
        lower:true,
        require:true,
    },
    email:{
        type:String,
        require: [true,"Email is compulsory!"],
        unique:[true,"Email already registered!"],
    },
    password:{
        type:String,
        require: [true,"Password is compulsory!"],
    },
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User",userSchema);