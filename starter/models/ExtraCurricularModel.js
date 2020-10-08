const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const extraCSchema = new Schema({

    semester : {
        type : Number,
        required: [true, 'Please provide semester'],
    },

    activity : {
        type : String,
        required: [true, 'Please provide Activity'],
 
    },

    levelActivity : {
       // enum : ['National' ,], // abhi tak decided nai hai
        type : String,
        required: [true, 'Please provide level of activity'],
 
    },

    position : {
        type : String,
        required: [true, 'Please provide your position'],
    },
    certificateUrl : {
        type : String,
        required : [true , "Please provide your certificate url"]
    }
})

var extraCurricular = mongoose.model("extraCurricular",extraCSchema)

module.exports = extraCurricular
