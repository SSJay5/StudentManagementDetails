const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const extraCSchema = new Schema({

    sem : {
        type : Number,
        default :''
    },

    activity : {
        type : String
    },

    levelActivity : {
        enum : [], // abhi tak decided nai hai
        type : String

    },

    position : {
        type : String,
        default : ''
    }

})

var extraCurricular = mongoose.model("extraCurricular",extraCSchema)

module.exports = extraCurricular