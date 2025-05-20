const router = require('express').Router()
const {
    createProductTable,
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/produstController')

router.post('/api/create-products-table', createProductTable)
router.get('/api/products', getProducts)
router.post('/api/products', createProduct)
router.get('/api/products/:id', getProductById)
router.put('/api/products/:id', updateProduct)
router.delete('/api/products/:id', deleteProduct)

module.exports = router;