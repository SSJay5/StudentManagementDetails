const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var attendanceSchema =  new Schema({ 
    
    sem : {
        type : Number,
        default : ""
    },

    tAttendance : {
        type : Number,
        max : 100,
        min : 0
    },

    pAttendance : {
        type : Number,
        max : 100,
        min : 0
    },

    avgAttendance : {
        type : Number,
        max : 100,
        min : 0
    }

})

var aSchema = mongoose.model("attendance",attendanceSchema);

module.exports = aSchema;