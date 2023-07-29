const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    username:{
        type:String,
        require: [true,"Name is compulsory!"],
    },
    website:{
        type:String,
    },
    password:{
        type:String,
        require: [true,"Phone number is compulsory!"],
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Contact",contactSchema);