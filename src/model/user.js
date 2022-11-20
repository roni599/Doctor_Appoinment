let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    user_name:{
        type: String,
        required: true,
        trim: true,
        // maxlength: 22
    },

    user_phone:{
        type: String,
        required: true,
        // min: 11,
        // max: 11
    },
    
    user_email:{
        type: String,
        required: true
    },

    user_password:{
        type: String,
        required: true
    },

    user_address:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);
// module.exports = user;