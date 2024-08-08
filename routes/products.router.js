const express = require('express');
const router = express.Router();
const ProductService = require('./../services/product.services');
const validate = require('./../middlewares/validator.handler');
const { idSchema, createProductSchema, updateProductSchema } = require('./../vali/product.schema');

const service = new ProductService();

// Ruta GET para obtener una lista de productos
router.get('/', async (req, res, next) => {
    try {
        const products = await service.find();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

// Ruta GET para obtener un producto por ID
router.get('/:id', validate(idSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        next(error);
    }
});

// Ruta POST para crear un nuevo producto
router.post('/', validate(createProductSchema, 'body'), async (req, res, next) => {
    try {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json({
            message: 'created',
            data: newProduct,
        });
    } catch (error) {
        next(error);
    }
});

// Ruta PATCH para actualizar un producto por ID
router.patch('/:id', validate(idSchema, 'params'), validate(updateProductSchema, 'body'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedProduct = await service.update(id, body);
        res.json({
            message: 'updated',
            data: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
});

// Ruta DELETE para eliminar un producto por ID
router.delete('/:id', validate(idSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const respuesta = await service.delete(id);
        res.json(respuesta);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
