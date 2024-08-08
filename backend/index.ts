import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { config as queryConfig } from './database/dbConfig';
import { mapShipments } from './mapping/mapShipments';

const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

app.get('/orders', async (req, res) => {
    try {
        const result = await queryConfig.query(`
            SELECT 
                orders.id,
                order_number,
                order_date, 
                order_status,
                estimated_time_arrival,
                actual_time_arrival
            FROM orders 
                JOIN order_line_items on orders.id = order_line_items.order_id
                JOIN products on products.id = order_line_items.product_id
        `);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

app.get('/products', async (req, res) => {
    try {
        const result = await queryConfig.query(`
            SELECT
                products.id,
                sku,
                product_description,
                is_active
            FROM products
                JOIN order_line_items on products.id = order_line_items.product_id
                JOIN orders on order_line_items.order_id = orders.id
        `);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/outstandingOrderItems', async (req, res) => {
    try {
        const result = await queryConfig.query(`
            SELECT sum(quantity_remaining) FROM order_line_items
                JOIN orders on order_line_items.order_id = orders.id
                JOIN products on products.id = order_line_items.product_id
                WHERE products.is_active = TRUE
        `);
        return res.status(200).json(result.rows[0].sum);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch outstanding order items' });
    }
});

app.get('/uniqueProductsOrdered', async (req, res) => {
    try {
        const result = await queryConfig.query(`
            SELECT count(distinct products.id) FROM products
                JOIN order_line_items on products.id = order_line_items.product_id
                WHERE is_active = TRUE
        `);
        return res.status(200).json(result.rows[0].count);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch unique products ordered' });
    }
});

app.get('/totalAmountSpent', async (req, res) => {
    try {
        const result = await queryConfig.query(`
            SELECT sum(price * total_quantity_invoiced) FROM order_line_items
                JOIN products on products.id = order_line_items.product_id
                JOIN orders on order_line_items.order_id = orders.id
                WHERE is_active = TRUE
        `);
        return res.status(200).json(result.rows[0].sum);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch total amount spent' });
    }
});

app.get('/lateDeliveries', async (req, res) => {
    try {
        const result = await queryConfig.query(`
            SELECT count(distinct orders.id) FROM orders
                WHERE order_status = 'DELIVERED'
                AND actual_time_arrival > estimated_time_arrival
        `);
        return res.status(200).json(result.rows[0].count);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch late deliveries' });
    }
});

app.post('/shipments', async (req, res) => {
    try {
        const data = mapShipments(req.body);
        const shipmentQuery = {
            text: 'INSERT INTO shipments (external_id, shipment_type, origin_port, destination_port, total_pieces, total_weight, total_volume, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [...Object.values(data)],
        };

        const result = await queryConfig.query(shipmentQuery);
        const shipmentId = result.rows[0].id;

        return res.status(200).json({
            id: shipmentId,
            message: 'Successfully created shipment'
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create shipment' });
    }
});