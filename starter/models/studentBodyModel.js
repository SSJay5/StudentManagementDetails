const mongoose = require('mongoose');

const studentBodySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'User Id not set'],
    },
    studentBodyYear: {
        type: String,
        required: [true, 'Please Provide Current working year of your committee'],
    },
    name: {
        type: String,
        required: [true, 'Please Provide Name of your committee'],
    },
    post: {
        type: String,
        required: [true, 'Please Provide your post in your committee'],
    },
});

const StudentBody = new mongoose.model('StudentBody', studentBodySchema);

module.exports = StudentBody;