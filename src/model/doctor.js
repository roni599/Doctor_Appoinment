let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let doctorSchema = new Schema({
    doctor_name:{
        type: String,
        required: true,
    },

    doctor_phone:{
        type: String,
        required: true,
    },
    
    doctor_email:{
        type: String,
        required: true
    },

    doctor_dept:{
        type: String,
        required: true
    },

    doctor_chamber:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('doctor', doctorSchema);