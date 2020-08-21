const mongoose = require('mongoose');

const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency

var projSchema =  new Schema({
    
    sem : {
        type : Number,
        default : ''
    },

    title : {
        type : String
    },

    from : {
        type : Date
    },

    to : {
        type : Date
    },

    role : {
        type : String
    },

    mentor : {
        type : String,
        default : ''
    },

    funded : {
        type : Boolean
    },

    //name of investor or amount not sure
    Investor : {
        type : String,
        type : Currency,
        default : ""
    },

    skills : {
        type : String
    }
    
})

var projectSchema = mongoose.model("projectSchema",projSchema);

module.exports = projectSchema