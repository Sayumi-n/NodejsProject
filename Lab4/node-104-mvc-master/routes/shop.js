const express = require('express');
const path = require('path');
const fs = require('fs');

const rootDirectory = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    const data = fs.readFileSync(path.join(rootDirectory, 'models', 'Products.json'));
    const prodData = JSON.parse(data);

    res.render('shop', {
        pageTitle: 'Shop Page',
        products: prodData
    });
});

module.exports = router;