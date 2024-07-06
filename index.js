const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb://localhost/vidly')
    .then (() => console.log('Connected to MongoDB ....'))
    .catch( (err) => console.log('Cound not connect to MongoDB', err));

app.use(express.json());

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

