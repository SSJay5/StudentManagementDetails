const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var onlineSchema =  new Schema({

    sem : {
        type : Number,
        required  : true 
    },

    platform : {
        type : String,
        required  : true 
    },

    domain : {
        type : String,
        required  : true 
    },

    from : {
        type : Date,
        required  : true 
    },

    to : {
        type : Date,
        required  : true 
    },

    certificate : {
        type : String,
        required  : true 
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
})

var OnlineCertificate = mongoose.model("OnlineCertificate",onlineSchema);

module.exports = OnlineCertificate;
