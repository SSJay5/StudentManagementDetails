const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const extraCSchema = new Schema({

    semester : {
        type : Number,
        required: [true, 'Please provide name of your Junior College'],
    },

    activity : {
        type : String,
        required: [true, 'Please provide name of your Junior College'],
 
    },

    levelActivity : {
       // enum : ['National' ,], // abhi tak decided nai hai
        type : String,
        required: [true, 'Please provide name of your Junior College'],
 
    },

    position : {
        type : String,
        required: [true, 'Please provide name of your Junior College'],
    },
    certificateUrl : {
        type : String,
        required : [true , "Please provide your certificate url"]
    }
})

var extraCurricular = mongoose.model("extraCurricular",extraCSchema)

module.exports = extraCurricular
