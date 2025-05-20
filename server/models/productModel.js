const createProductTableQuary = `
    CREATE TABLE IF NOT EXISTS products (
        id serial PRIMARY KEY,
        name varchar(100),
        sku varchar(20),
        quantity_rent int,
        quantity_sale int,
        price_rent decimal(9,2),
        price_sale decimal(9,2),
        rules text,
        bundle text
    );
`;

module.exports = { createProductTableQuary };