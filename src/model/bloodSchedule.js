let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bloodScheduleSchema = new Schema({
    donor_name:{
        type: String
    },
    hospital_address:{
        type: String
    },
    date:{
        type: Date
    },
    time:{
        type: String
    }
});

module.exports = mongoose.model('donorSchedule', bloodScheduleSchema);