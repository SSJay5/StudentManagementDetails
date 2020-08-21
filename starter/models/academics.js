const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const acadSchema = new Schema({

    schoolName : { 
        type :String,
        required : true
    },

    ssc : { 
        type : Number,
        required : true
    },
    
    hsc : {
        type: Number,
        required : true 
    },

    dept : { 
        type :String,
        required : true
    },

    semCurrent : { 
        type : Number,
        required : true
    },

    cgpi : [pointerSchema],

    domainInterest : { 
        type :String,
        required : true
    },

    programLang : { 
        type :String,
        required : true
    }
})

const pointerSchema = new Schema({

    sem : {
        type : Number,
        required : true,
        min : 1,
        max : 8
    }, 

    gpa : {
        type : Number, 
        required : true,
        max : 10
    }
})

var academics = mongoose.model("academics",acadSchema);

module.exports = academics;