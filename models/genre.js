
const mongoose = require('mongoose');
const Joi = require('joi');


//Create the schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    }
}) 

//Create the model from the schema
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);

}

exports.Genre = Genre;
exports.validate = validateGenre;