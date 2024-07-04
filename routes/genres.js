const express = require('express');
const router = express.Router();
const Joi = require('joi');


const genres =[
    {id:1, name:'Action'},
    {id:2, name:'Comedy'},
    {id:3, name:'Romance'}
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('The genre with the given id was not found');
        return;
    }

    res.send(genre);

   
});

router.post('/', (req, res) => {
    
    const {error} = validateGenre(req.body);

    //return 400 if invalid genre
    if (error) {
        return res.status(400).send(error.details[0].message);

    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);

});

router.put('/:id', (req, res) => {
    //return 404 if genre does not exist
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('The genre with the given id was not found');
        return;
    }
    //return 400 if invalid genre
    const {error} = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //update genre
    genre.name = req.body.name;
    res.send(genre);

});

router.delete('/:id', (req, res) => {
    //return 404 if not found
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send('The genre with the given id was not found');
        return;
    }

    //Delete genre
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

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