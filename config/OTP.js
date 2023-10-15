otpObject = {
    users : {

    },
    generateOTP : function(email){
        let otp = Math.floor(Math.random()*1000000);
        otp = otp.toString();
        while(otp.length<6){
            otp = "O" + otp;
        }
        this.users[email] = {otp,timestamp:Date.now()};
        return otp;
    },
    verifyOTP : function(email,otp){
        if(this.users[email].otp == otp){
            return true;
        }
        else{
            return false;
        }
    },
    cleanExpiredValues : function(){
        for(let email in this.users){
            if(Date.now() - this.users[email].timestamp > 600000){
                delete this.users[email];
            }
        }
    }
}

exports.otpObject = otpObject;