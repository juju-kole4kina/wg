const express = require('express')
const dotenv = require('dotenv')
const { pool } = require('./config/db')

const routerProducts = require('./routers/products')
const routerOrders = require('./routers/orders')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(routerProducts)

// app.get('/api/health-check', async (req, res) => {
//     try {
//         await pool.query('SELECT 1')
//         res.status(200).send('OK')
//     } catch(err) {
//         res.status(500).send('DB connection failed')
//     }
// })

pool.query('SELECT NOW()', (err, res) => {
    if(err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database:', res.rows);
    }
})

app.get('/', (req, res) => {})
app.get('/dashboard', (req, res) => {})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})