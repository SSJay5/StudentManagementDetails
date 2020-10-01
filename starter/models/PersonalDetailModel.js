const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var detailsSchema =  new Schema({

    firstname : {
        type : String,
        required  :  [true, "Please provide your first name"]
    },

    middlename: {
        type : String,
        required : [true, "Please provide your middle name"]

    },

    lastname : {
        type : String,
        required : [true, "Please provide your last name"] 
    },

    dateOfBirth : {
        type : Date,
        required : [true, "Please provide your Date of Birth"]
    },

    collegeId : {
        type : String,
        required : [true, "Please provide your College ID"],
        unique : true  
    },

    contact : {
        type : Number,
        required : [true, "Please provide your contact number"],
       
    },

    contactParent : {
        type : Number,
        required : [true, "Please provide your Parent's Contact Number"],
       
    },

    address :{ 
        type :String,
        required : [true, "Please provide your Address"]
    },
    
    addressPermanent : {
        type : String,
        required : [true, "Please provide your Permanent Address"]
    },

    profilePhoto : {
        type : String,
        required : [true, "Please provide your Profile Photo"]
    },
    
})

var personalDetails = mongoose.model("personalDetails",detailsSchema);

module.exports = personalDetails;
