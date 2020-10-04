const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var onlineSchema =  new Schema({

    sem : {
        type : Number,
        required  : [true, "Please provide your semester"] 
    },

    platform : {
        type : String,
        required  : [true ,"Please provide your platform"] 
    },

    domain : {
        type : String,
        required  : [true ,"Please provide your domain"] 
    },

    from : {
        type : Date,
        required  : [true ,"Please provide your start date"]
    },

    to : {
        type : Date,
        required  : [true ,"Please provide your end date"]
    },

    certificateUrl : {
        type : String,
        required  : [true ,"Please provide your certificate url"] 
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
})

var OnlineCertificate = mongoose.model("OnlineCertificate",onlineSchema);

module.exports = OnlineCertificate;
