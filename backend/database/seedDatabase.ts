const path = require('path');
const { config: seedClient } = require(path.join(__dirname, 'dbConfig.ts'));

export { };

async function seedDatabase() {
    const client = await seedClient.connect()

    await client.query(
        `CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public`
    )

    await client.query(
        `CREATE TABLE IF NOT EXISTS orders (
            id uuid DEFAULT uuid_generate_v4() NOT NULL,
            shipment_id uuid,
            order_number text,
            order_date date,
            order_status text,
            total_quantity numeric,
            total_quantity_invoiced numeric,
            total_quantity_received numeric,
            total_quantity_remaining numeric,
            estimated_time_arrival timestamp without time zone,
            actual_time_arrival timestamp without time zone,
            created_at timestamp with time zone DEFAULT now() NOT NULL,
            updated_at timestamp with time zone DEFAULT now() NOT NULL,
            PRIMARY KEY(id)
        )`
    )

    await client.query(
        `CREATE TABLE IF NOT EXISTS products (
            id uuid DEFAULT uuid_generate_v4() NOT NULL,
            sku text,
            product_description text,
            is_active boolean,
            created_at timestamp with time zone DEFAULT now() NOT NULL,
            updated_at timestamp with time zone DEFAULT now() NOT NULL,
            PRIMARY KEY(id)
        )`
    )

    await client.query(
        `CREATE TABLE IF NOT EXISTS order_line_items (
            id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
            order_id uuid NOT NULL,
            product_id uuid NOT NULL,
            line_number integer,
            quantity numeric,
            quantity_invoiced numeric,
            quantity_received numeric,
            quantity_remaining numeric,
            price numeric(15,3),
            CONSTRAINT order_line_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            CONSTRAINT order_line_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
            PRIMARY KEY(id)
        )`
    )

    await client.query(
        `CREATE TABLE IF NOT EXISTS locations (
            id uuid DEFAULT uuid_generate_v4() NOT NULL,
            code text NOT NULL,
            country_code text NOT NULL,
            country text NOT NULL,
            city text NOT NULL,
            created_at timestamp with time zone DEFAULT now() NOT NULL,
            updated_at timestamp with time zone DEFAULT now() NOT NULL,
            PRIMARY KEY(id)
        )`
    )

    await client.query(
        `CREATE TABLE IF NOT EXISTS shipments (
            id uuid DEFAULT uuid_generate_v4() NOT NULL,
            external_id text NOT NULL,
            shipment_type text NOT NULL,
            origin_port text NOT NULL,
            destination_port text NOT NULL,
            total_pieces numeric NOT NULL,
            total_weight jsonb NOT NULL,
            total_volume jsonb NOT NULL,
            notes text,
            created_at timestamp with time zone DEFAULT now() NOT NULL,
            updated_at timestamp with time zone DEFAULT now() NOT NULL,
            PRIMARY KEY(id)
        )`
    )

    await client.query(
        `INSERT INTO orders(id, order_number, order_date, order_status, total_quantity, total_quantity_invoiced, total_quantity_received, total_quantity_remaining, estimated_time_arrival, actual_time_arrival) VALUES
            ('3bd0e2b5-7e07-4cc6-9382-252cdd1d3d41', 'FFI-12345', '2024-05-12', 'DELIVERED', 6, 6, 4, 2, '2024-06-01 10:15:00', '2024-06-07 15:15:00'),
            ('6ad8f891-59a3-4d6b-9333-4ee1f2cdf82c', 'FFI-23456', '2024-05-19', 'IN_PROGRESS', 12, 10, 0, 12, '2024-06-21 13:30:00', NULL),
            ('52a69425-0e8f-464f-bb98-043bd8611735', 'FFI-34567', '2024-07-01', 'DRAFT', 9, 0, 0, 0, NULL, NULL),
            ('151601b7-3a99-45fd-a744-eb41a49af27a', 'AS-12345', '2024-05-12', 'DELIVERED', 6, 6, 4, 2, '2024-06-01 10:15:00', '2024-06-07 15:15:00'),
            ('b4866788-8ba6-40cc-8afb-47e32e5a469d', 'AS-23456', '2024-05-19', 'IN_PROGRESS', 12, 10, 0, 12, '2024-06-21 13:30:00', NULL),
            ('fcf4b209-57cc-41a8-bbdb-d58a0c005ab1', 'AS-34567', '2024-07-01', 'DRAFT', 9, 0, 0, 0, NULL, NULL),
            ('feb5c20e-0ab8-4d36-91f0-073e4409511f', 'CFL-12345', '2024-05-12', 'DELIVERED', 6, 6, 4, 2, '2024-06-01 10:15:00', '2024-06-07 15:15:00'),
            ('b8b97b6c-891c-42cf-9309-5bd84e7e626d', 'CFL-23456', '2024-05-19', 'IN_PROGRESS', 12, 10, 0, 12, '2024-06-21 13:30:00', NULL),
            ('f5a4d949-e2ca-407a-8b0f-6e8399ec325b', 'CFL-34567', '2024-07-01', 'DRAFT', 9, 0, 0, 0, NULL, NULL)`
    )

    await client.query(
        `INSERT INTO products(id, sku, product_description, is_active) VALUES
            ('44c5de47-b420-4dac-bd90-aac13868c317',  'FFI123', 'An awesome product we can ship', TRUE),
            ('908b0200-1646-48ad-8d73-d5c2ba640841',  'FFI234', 'An awesome product we can ship', FALSE),
            ('99e31f16-5870-4799-aab8-6b07a69172b6',  'FFI345', 'An awesome product we can ship', TRUE),
            ('fadbef6c-4330-4023-8327-3d68fd92f817',  'FFI456', 'An awesome product we can ship', FALSE),
            ('d0153d66-e855-4768-85a9-a4d6e03a21e2',  'FFI567', 'An awesome product we can ship', TRUE),
            ('22193641-ef86-4974-b66e-a6822f42f5cc',  'AS123', 'An awesome product we can ship', FALSE),
            ('6ff006d2-b7b1-4be7-8674-ff78b4f1bd96',  'AS234', 'An awesome product we can ship', TRUE),
            ('7ede9510-50f3-426d-aec7-3a820f0d68b2',  'AS345', 'An awesome product we can ship', FALSE),
            ('5ac78096-5c73-4013-bd4c-082171ecf4a0',  'AS456', 'An awesome product we can ship', TRUE),
            ('7262bb35-625a-4cc4-8701-3ceabebaae0d',  'AS567', 'An awesome product we can ship', FALSE),
            ('1f12fc2c-bbc0-4913-a076-6cd6ffb1c732',  'CFL123', 'An awesome product we can ship', TRUE),
            ('b39f5605-086a-49c8-a28e-c89cfc8f6af6',  'CFL234', 'An awesome product we can ship', TRUE),
            ('06f934fe-ee8e-4c9c-96db-cbb234499bfb',  'CFL345', 'An awesome product we can ship', TRUE),
            ('6c9cc622-66e8-4cbb-b83b-f992955e874e',  'CFL456', 'An awesome product we can ship', TRUE),
            ('b5ae2b61-073f-4fff-bc42-76b9c90ba21a',  'CFL567', 'An awesome product we can ship', TRUE)`
    )

    await client.query(
        `INSERT INTO order_line_items(order_id, product_id, line_number, quantity, quantity_invoiced, quantity_received, quantity_remaining, price) VALUES
            ('3bd0e2b5-7e07-4cc6-9382-252cdd1d3d41', '44c5de47-b420-4dac-bd90-aac13868c317', 1, 2, 2, 2, 0, 12.50),
            ('3bd0e2b5-7e07-4cc6-9382-252cdd1d3d41', '99e31f16-5870-4799-aab8-6b07a69172b6', 2, 4, 4, 2, 2, 17.50),
            ('6ad8f891-59a3-4d6b-9333-4ee1f2cdf82c', 'd0153d66-e855-4768-85a9-a4d6e03a21e2', 1, 10, 10, 0, 10, 12.50),
            ('6ad8f891-59a3-4d6b-9333-4ee1f2cdf82c', '908b0200-1646-48ad-8d73-d5c2ba640841', 2, 2, 0, 0, 2, 7.25),
            ('52a69425-0e8f-464f-bb98-043bd8611735', 'd0153d66-e855-4768-85a9-a4d6e03a21e2', 1, 6, 0, 0, 6, 12.50),
            ('52a69425-0e8f-464f-bb98-043bd8611735', '99e31f16-5870-4799-aab8-6b07a69172b6', 2, 3, 0, 0, 3, 17.50),
            ('151601b7-3a99-45fd-a744-eb41a49af27a', '6ff006d2-b7b1-4be7-8674-ff78b4f1bd96', 1, 2, 2, 2, 0, 12.50),
            ('151601b7-3a99-45fd-a744-eb41a49af27a', '5ac78096-5c73-4013-bd4c-082171ecf4a0', 2, 4, 4, 2, 2, 17.50),
            ('b4866788-8ba6-40cc-8afb-47e32e5a469d', '5ac78096-5c73-4013-bd4c-082171ecf4a0', 1, 10, 10, 0, 10, 12.50),
            ('b4866788-8ba6-40cc-8afb-47e32e5a469d', '22193641-ef86-4974-b66e-a6822f42f5cc', 2, 2, 0, 0, 2, 7.25),
            ('fcf4b209-57cc-41a8-bbdb-d58a0c005ab1', '7262bb35-625a-4cc4-8701-3ceabebaae0d', 1, 6, 0, 0, 6, 12.50),
            ('fcf4b209-57cc-41a8-bbdb-d58a0c005ab1', '7ede9510-50f3-426d-aec7-3a820f0d68b2', 2, 3, 0, 0, 3, 17.50),
            ('3bd0e2b5-7e07-4cc6-9382-252cdd1d3d41', '1f12fc2c-bbc0-4913-a076-6cd6ffb1c732', 1, 2, 2, 2, 0, 12.50),
            ('3bd0e2b5-7e07-4cc6-9382-252cdd1d3d41', 'b39f5605-086a-49c8-a28e-c89cfc8f6af6', 2, 4, 4, 2, 2, 17.50),
            ('6ad8f891-59a3-4d6b-9333-4ee1f2cdf82c', 'b39f5605-086a-49c8-a28e-c89cfc8f6af6', 1, 10, 10, 0, 10, 12.50),
            ('6ad8f891-59a3-4d6b-9333-4ee1f2cdf82c', '06f934fe-ee8e-4c9c-96db-cbb234499bfb', 2, 2, 0, 0, 2, 7.25),
            ('52a69425-0e8f-464f-bb98-043bd8611735', '6c9cc622-66e8-4cbb-b83b-f992955e874e', 1, 6, 0, 0, 6, 12.50),
            ('52a69425-0e8f-464f-bb98-043bd8611735', 'b5ae2b61-073f-4fff-bc42-76b9c90ba21a', 2, 3, 0, 0, 3, 17.50)`
    )

    console.log('Successfully seeded database')

    await client.release()
}

seedDatabase()