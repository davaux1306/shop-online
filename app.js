const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const products = [
    {
        _id: 'book01',
        name: 'Les Fables de La Fontaine',
        description: 'A great book written by Jean de La Fontaine',
        price: 50,
        inStock: true,
    },
    {
        _id: 'book02',
        name: 'Les Trois Mousquetaires',
        description: 'A great book written by Alexandre Dumas',
        price: 45,
        inStock: true,
    }
];

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// POST
app.post('/api/products', (req, res, next) => {
    console.log(req.body);
    const product = req.body;
    product._id = "01"
    products.push(product);
    res.status(201).json({ product });
});

// Get a product by id
app.get('/api/products/:id', (req, res, next) => {
    const product = products.find(product => product._id === req.params.id);
    res.status(200).json({ product })
});

// Update a single product (PUT)
app.put('/api/products/:id', (req, res, next) => {
    const product = {
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock,
    };
    const i = products.findIndex(product => product._id === req.params.id);
    products[i] = product;
    res.status(201).json({ message: 'Modified!' });
});

app.delete('/api/products/:id', (req, res, next) => {
    const i = products.findIndex(product => product._id === req.params.id);
    products.splice(i, 1);
    res.status(200).json({ message: 'Deleted!' });
});


// GET
app.use('/api/products', (req, res, next) => {
    res.status(200).json({ products });
});

module.exports = app;