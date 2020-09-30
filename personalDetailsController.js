const PersonalDetails = require('../models/PersonalDetailModel')

const User = require('../models/userModel')

const factory = require('./handelFactory');

const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.getPersonalDetails = factory.getOne(PersonalDetails);

exports.createPersonalDetails = catchAsync(async (req, res,next) => {
    if(req.user.personalDetails){
        return next(new AppError("Please update your Existing File", 400))
    }

    const personalDetails = await PersonalDetails.create(req.body)

    req.user.personalDetails = personalDetails._id;

    await User.findByIdAndUpdate(
        req.user.id,
        {
            personalDetails : req.user.personalDetails
        },
        
        {
            new :  true,
            runValidators : true
        }
    );

    res.status(201).json({
        status : 'success',
        data : {personalDetails}
    })
})

exports.updatePersonalDetails = factory.updateOne(PersonalDetails)