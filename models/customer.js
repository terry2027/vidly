const mongoose = require('mongoose');
const Joi = require('joi');

//Create the schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        default: false
    }
}) 

//Create the model from the schema
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
            name: Joi.string().min(3).required(),
            phone: Joi.string().min(7).max(10).required(),
            isGold: Joi.boolean()
        });
    
    return schema.validate(customer);

}

exports.Customer = Customer;
exports.validate = validateCustomer;