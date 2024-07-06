const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);
    }
    catch (ex) {
            res.status(404).send('The genre with the given id was not found');
            return;
        }
});

router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);

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
    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, 
            {new: true}
        );
        //send genre in response
        res.send(genre);
    }
    catch (ex) {
        //return 404 if genre does not exist
        res.status(404).send('The genre with the given id was not found');
        return;
    }
});

router.delete('/:id', async (req, res) => {
    
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        //Return deleted genre object
        res.send(genre);

    }
    catch (ex) {
        //return 404 if not found
            res.status(404).send('The genre with the given id was not found');
            return;
    }
})

module.exports = router;