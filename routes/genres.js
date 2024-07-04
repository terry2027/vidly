const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
    }
    catch (ex) {
            res.status(404).send('The genre with the given id was not found');
            return;
        }
    res.send(genre);
});

router.post('/', async (req, res) => {
    
    const {error} = validateGenre(req.body);

    //return 400 if invalid genre
    if (error) {
        return res.status(400).send(error.details[0].message);

    }

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    //return 400 if invalid genre
    const {error} = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, 
            {new: true}
        );
    }
    catch (ex) {
        //return 404 if genre does not exist
        res.status(404).send('The genre with the given id was not found');
        return;
    }

    
    
    //send genre in response
    res.send(genre);

});

router.delete('/:id', async (req, res) => {
    
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
    }
    catch (ex) {
        //return 404 if not found
            res.status(404).send('The genre with the given id was not found');
            return;

    }
    
    //Return deleted genre object
    res.send(genre);

})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);

}
module.exports = router;