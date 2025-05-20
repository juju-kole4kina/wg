const express = require('express')
const dotenv = require('dotenv')
const { pool } = require('./config/db')

const routerProducts = require('./routers/products')
const routerOrders = require('./routers/orders')

const serverError = require('./middlewares/serverError')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(routerProducts)


pool.query('SELECT NOW()', (err, res) => {
    if(err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database:', res.rows);
    }
})


app.use(serverError)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})