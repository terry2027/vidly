const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();

//Get all customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

//Get specific customer
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    }
    catch (ex) {
            res.status(404).send('The customer with the given id was not found');
            return;
    }
});

//Add a customer
router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);

    //return 400 if invalid customer
    if (error) {
        return res.status(400).send(error.details[0].message);

    }

    let customer = new Customer({ 
                    name: req.body.name ,
                    phone: req.body.phone,
                    isGold: req.body.isGold   
                    });
    customer = await customer.save();

    res.send(customer);
});

//Update a customer
router.put('/:id', async (req, res) => {
    //return 400 if invalid customer
    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
            const customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold}, 
            {new: true}   
        );
        //send customer in response
        res.send(customer);
    }
    catch (ex) {
        //return 404 if customer does not exist
        res.status(404).send('The customer with the given id was not found');
        return;
    }
});

//Delete a customer
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
            
        //Return deleted customer object
        res.send(customer);
    }
    catch (ex) {
        //return 404 if not found
            res.status(404).send('The customer with the given id was not found');
            return;
    }
})

module.exports = router;