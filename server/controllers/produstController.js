const pool = require('../config/db').pool;
const { createProductTableQuary } = require('../models/productModel')

const {
    BAD_REQUEST_ERROR_MESSAGE,
    NOT_FOUND_ERROR_MESSAGE,
    FORBITTEN_ERROR_MESSAGE,
    VALIDATON_ERROR_NAME,
    CONFLICT_ERROR_MESSAGE,
    CASTOM_ERROR_NAME,
    DUPLICATE_KEY_ERROR_CODE
} = require('../utils/constants')

const NotFoundErr = require('../errors/not-found-err')
const BadRequestErr = require('../errors/bad-request-err')
const ForbittenErr = require('../errors/forbitten-err')
const ConflictErr = require('../errors/conflict-err')

const createProductTable = async (req, res, next) => {
    try {
        const result = await pool.query(createProductTableQuary)
        res.status(200).json({ message: 'Таблица products успешно создана' })
    } catch(err) {
        console.error('Ошибка при создании таблицы products: ', err)
        next(err)
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
        if(err.code === DUPLICATE_KEY_ERROR_CODE) {
            next(new ConflictErr(CONFLICT_ERROR_MESSAGE))
        }
        if(err.name === VALIDATON_ERROR_NAME) {
            next(new BadRequestErr(BAD_REQUEST_ERROR_MESSAGE))
            return
        }
        next(err)
    }
}

const getProducts = async (req, res, next) => {
    try {
        const result = await pool.query(`SELECT * FROM products`)
        res.status(200).json(result.rows)
    } catch(err) {
        console.error('Не удалось получить список товаров: ', err)
        next(err)
    }
}

const getProductById = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const result = await pool.query(`
            SELECT * FROM products 
            WHERE id = $1
        `, [productId])
        if(result.rows.length === 0) {
            throw new NotFoundErr(NOT_FOUND_ERROR_MESSAGE)
        } else {
            res.status(200).json(result.rows[0])
        }
    } catch(err) {
        console.error('Ошибка при получении товара: ', err)
        next(err)
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
            throw new NotFoundErr(NOT_FOUND_ERROR_MESSAGE)
        } else {
            res.status(204).json(result.rows[0])
        }
    } catch(err) {
        console.error('Ошибка при обновлении товара: ', err)
        if(err.code === DUPLICATE_KEY_ERROR_CODE) {
            next(new ConflictErr(CONFLICT_ERROR_MESSAGE))
        }
        if(err.name === VALIDATON_ERROR_NAME) {
            next(new BadRequestErr(BAD_REQUEST_ERROR_MESSAGE))
            return
        }
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const result = await pool.query(`
            DELETE FROM products
            WHERE id = $1
            RETURNING *;
        `, [productId])
        if (result.rows.length === 0) {
            throw new NotFoundErr(NOT_FOUND_ERROR_MESSAGE)
        } else {
            res.status(204).json(result.rows[0])
        }
    } catch(err) {
        console.error('Ошибка при удалении товара: ', err)
        if(err.name === CASTOM_ERROR_NAME) {
            next(new BadRequestErr(BAD_REQUEST_ERROR_MESSAGE))
            return
        }
        next(err)
    }
}

module.exports = { createProductTable, createProduct, getProducts, getProductById, updateProduct, deleteProduct }