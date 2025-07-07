import { Schema } from '../types';

export const mockSchema: Schema = {
  tables: [
    {
      name: 'users',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
        { name: 'name', type: 'VARCHAR(255)', nullable: false },
        { name: 'email', type: 'VARCHAR(255)', nullable: false },
        { name: 'created_at', type: 'TIMESTAMP', nullable: false },
        { name: 'updated_at', type: 'TIMESTAMP', nullable: true },
      ],
    },
    {
      name: 'orders',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
        { name: 'customer_id', type: 'INTEGER', nullable: false },
        { name: 'customer', type: 'VARCHAR(255)', nullable: false },
        { name: 'total', type: 'DECIMAL(10,2)', nullable: false },
        { name: 'status', type: 'VARCHAR(50)', nullable: false },
        { name: 'order_date', type: 'TIMESTAMP', nullable: false },
      ],
    },
    {
      name: 'products',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
        { name: 'name', type: 'VARCHAR(255)', nullable: false },
        { name: 'description', type: 'TEXT', nullable: true },
        { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
        { name: 'category', type: 'VARCHAR(100)', nullable: false },
        { name: 'stock_quantity', type: 'INTEGER', nullable: false },
      ],
    },
    {
      name: 'categories',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'description', type: 'TEXT', nullable: true },
        { name: 'parent_id', type: 'INTEGER', nullable: true },
      ],
    },
  ],
};