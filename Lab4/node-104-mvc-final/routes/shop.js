const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getProducts);

router.post('/show-product', productController.getOneProductByForm);

router.get('/show-product/:productId',productController.getOneProductById);

router.post('/delete-product',productController.postDeleteProduct);



module.exports = router;