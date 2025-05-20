const pool = require('../config/db').pool;
const { createProductTableQuary } = require('../models/productModel')

const createProductTable = async (req, res) => {
    try {
        const result = await pool.query(createProductTableQuary)
        res.status(200).json({ message: 'Таблица products успешно создана' })
    } catch(err) {
        console.error('Ошибка при создании таблицы products: ', err)
        res.status(500).json({ error: err.message })
    }
}

const createProduct = async (req, res) => {
    const { name, sku, quantity_rent, quantity_sale, price_rent, price_sale, rules, bundle } = req.body;
    try {
        const result = await pool.query(`
        INSERT INTO products (name, sku, quantity_rent, quantity_sale, price_rent, price_sale, rules, bundle)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `, [name, sku, quantity_rent, quantity_sale, price_rent, price_sale, rules, bundle])
        res.status(200).json(result.rows[0])
    } catch(err) {
        console.error('Ошибка при создании товара: ', err)
        res.status(500).json({ error: err.message })
    }
}

const getProducts = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM products`)
        res.status(200).json(result.rows)
    } catch(err) {
        console.error('Не удалось получить список товаров: ', err)
        res.status(500).json({ error: err.message })
    }
}

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await pool.query(`
            SELECT * FROM products 
            WHERE id = $1
        `, [productId])
        if(result.rows.length === 0) {
            res.status(404).json({ error: 'Товар не найден' })
        } else {
            res.status(200).json(result.rows[0])
        }
    } catch(err) {
        console.error('Ошибка при получении товара: ', err)
        res.status(500).json({ error: err.message })
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, sku, quantity_rent, quantity_sale, price_rent, price_sale, rules, bundle } = req.body;
    try {
        const result = await pool.query(`
            UPDATE products
            SET name = $2, sku = $3, quantity_rent = $4, quantity_sale = $5, price_rent = $6, price_sale = $7, rules = $8, bundle = $9
            WHERE id = $1
            RETURNING *;
        `, [productId, name, sku, quantity_rent, quantity_sale, price_rent, price_sale, rules, bundle])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Товар не найден' })
        } else {
            res.status(200).json(result.rows[0])
        }
    } catch(err) {
        console.error('Ошибка при обновлении товара: ', err)
        res.status(500).json({ error: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await pool.query(`
            DELETE FROM product
            WHERE id = $1
            RETURNING *;
        `, [productId])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Товар не найден' })
        } else {
            res.status(204).json(result.rows[0])
        }
    } catch(err) {
        console.error('Ошибка при удалении товара: ', err)
        res.status(500).json({ error: err.message })
    }
}

module.exports = { createProductTable, createProduct, getProducts, getProductById, updateProduct, deleteProduct }