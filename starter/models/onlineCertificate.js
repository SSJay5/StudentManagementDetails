const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var onlineSchema =  new Schema({

    sem : {
        type : Number,
        default : ""
    },

    platform : {
        type : String

    },

    domain : {
        type : String

    },

    from : {
        type : Date
    },

    to : {
        type : Date
    },

    certificate : {
        type : String
    } 

})

var oSchema = mongoose.model("onlineSchema",onlineSchema);

module.exports = oSchema;