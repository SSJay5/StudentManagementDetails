const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const academicsSchema = new Schema({

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

    domainInterest : { 
        type :String,
        required : true
    },

    programLang : { 
        type :String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
    {
        toJSON : {virtuals : true }, toObject : { virtuals : true}
    }
);

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
    },

    photo : {
        type : String
    },

    acad : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'acad'
    }
})


academicsSchema.virtual('pointers',{
    ref : 'Pointer',
    foreignField : 'acad',
    localField : '_id'
})


var Academics = mongoose.model("academics",academicsSchema);

var Pointer = mongoose.model("pointers",pointerSchema)

module.exports = {Academics , Pointer};