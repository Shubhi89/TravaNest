const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        description: joi.string().required(),
        country: joi.string().required(),
        image: joi.string().allow(null, ''),
        typeOfPlace: joi.string().valid('Rooms', 'Iconic Cities', 'Mountains', 'Castles', 'Pools', 'Camping', 'Farms', 'Arctic').required(),
    }).required()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(1).max(5),
    }).required()
});