const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var detailsSchema =  new Schema({

    firstname : {
        type : String,
        required  :  true
    },

    middlename: {
        type : String,
        required : true 

    },

    lastname : {
        type : String,
        required :true   
    },

    dateOfBirth : {
        type : Date,
        required : true
    },

    collegeId : {
        type : String,
        required : true,
        unique : true  
    },

    contact : {
        type : Number,
        required : true,
        min : 10,
        max : 10
    },

    contactParent : {
        type : Number,
        required : true,
        min : 10,
        max : 10
    },

    address :{ 
        type :String,
        required : true
    },
    
    addressPermanent : {
        type : String,
        required : true
    },

    profilePhoto : {
        type : String,
        required : true
    },
    
})

var personalDetails = mongoose.model("personalDetails",detailsSchema);

module.exports = personalDetails;
