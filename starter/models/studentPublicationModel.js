const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentPublicationSchema = new Schema({

    title: {
        type: String,
        required: [true, "Please provide the title"]
    },

    studentPublicationYear: {
        type: String,
        required: [true, "Please provide the year"]
    },

    author: {
        type: String,
        required: [true, "Please provide the Author's name"]
    },


    dateOfIssue: {
        type: Date,
        required: [true, "Please provide the Date when it was issued"]
    },

    volume: {
        type: String,
        required: [true, "Please specify the volume"]
    },

    pageNumber: {
        type: String,
        required: [true, "Please provide the Page Number"]
    },

    publisher: {
        type: String,
        required: [true, "Please provide the Publisher's Name"]
    },

    ISBN: {
        type: Number,
        required: [true, "Please provide the ISBN"]
    },

    paperType: {
        enum: ['Journal', 'Conference'],
        type: String,
        required: [true, "Please provide the Paper Type"]
    },

    paperLevel: {
        enum: ['National', 'International'],
        type: String,
        required: [true, "Please provide the Paper Level"]
    },
    studentPublicationCertificateUrl: {
        type: String,
        required: [true, "Please provide the certificate url"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "No user id set"]
    }
})

const StudentPublication = new mongoose.model('StudentPublication', studentPublicationSchema);

module.exports = StudentPublication;