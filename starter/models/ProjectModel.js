const mongoose = require('mongoose');

const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency

var projectSchema =  new Schema({
    
    sem : {
        type : Number,
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
        default : ""
    },

    skills : {
        type : String
    }
    
})

var project = mongoose.model("projectSchema",projectSchema);

module.exports = project