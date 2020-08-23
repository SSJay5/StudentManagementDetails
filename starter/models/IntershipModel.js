const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const intershipSchema = new Schema({

    sem : {
        type : Number,
        default : ''
    },

    cName : {
        type : String,
    },

    duration : {
        type : Date
    },

    domain : {
        type : String
    },

    Stipend : {
        type : String,
        default : '' 
    },

    certificate : {
        type : String
    }

})

var intership = mongoose.model("intershipSchema",intershipSchema);

module.exports = intership