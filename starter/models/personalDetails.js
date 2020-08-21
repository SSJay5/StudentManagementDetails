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

    idNumber : {
        type : String,
        required : true 
    },

    contact : {
        type : String,
        required : true
    },

    contactParent : {
        type : String,
        required : true
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
    }

    
})

var personalDetails = mongoose.model("personalDetails",detailsSchema);

module.exports = personalDetails;