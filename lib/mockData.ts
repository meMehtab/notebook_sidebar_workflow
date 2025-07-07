interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string | null;
}

interface Order {
  id: number;
  customer_id: number;
  customer: string;
  total: number;
  status: string;
  order_date: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  parent_id: number | null;
}

// Define the mock data structure
interface MockData {
  users: User[];
  orders: Order[];
  products: Product[];
  categories: Category[];
}

export const mockData: MockData = {
    users: [
      {
        id: 1,
        name: 'Charlie Johnson',
        email: 'charlie@example.com',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-20T14:22:00Z',
      },
      {
        id: 2,
        name: 'Diana Smith',
        email: 'diana@example.com',
        created_at: '2024-01-16T09:15:00Z',
        updated_at: '2024-01-21T11:45:00Z',
      },
      {
        id: 3,
        name: 'Edward Brown',
        email: 'edward@example.com',
        created_at: '2024-01-17T16:20:00Z',
        updated_at: null,
      },
      {
        id: 4,
        name: 'Fiona Davis',
        email: 'fiona@example.com',
        created_at: '2024-01-18T13:45:00Z',
        updated_at: '2024-01-22T08:30:00Z',
      },
    ],
    orders: [
      {
        id: 1,
        customer_id: 1,
        customer: 'Charlie Johnson',
        total: 299.99,
        status: 'completed',
        order_date: '2024-01-20T14:30:00Z',
      },
      {
        id: 2,
        customer_id: 2,
        customer: 'Diana Smith',
        total: 159.50,
        status: 'pending',
        order_date: '2024-01-21T10:15:00Z',
      },
      {
        id: 3,
        customer_id: 1,
        customer: 'Charlie Johnson',
        total: 89.99,
        status: 'shipped',
        order_date: '2024-01-22T09:45:00Z',
      },
      {
        id: 4,
        customer_id: 3,
        customer: 'Edward Brown',
        total: 450.00,
        status: 'completed',
        order_date: '2024-01-23T16:20:00Z',
      },
    ],
    products: [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones',
        price: 199.99,
        category: 'Electronics',
        stock_quantity: 45,
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor',
        price: 299.99,
        category: 'Electronics',
        stock_quantity: 23,
      },
      {
        id: 3,
        name: 'Coffee Maker',
        description: 'Programmable drip coffee maker with thermal carafe',
        price: 89.99,
        category: 'Kitchen',
        stock_quantity: 12,
      },
      {
        id: 4,
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        price: 45.99,
        category: 'Office',
        stock_quantity: 67,
      },
    ],
    categories: [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        parent_id: null,
      },
      {
        id: 2,
        name: 'Kitchen',
        description: 'Kitchen appliances and accessories',
        parent_id: null,
      },
      {
        id: 3,
        name: 'Office',
        description: 'Office supplies and furniture',
        parent_id: null,
      },
      {
        id: 4,
        name: 'Audio',
        description: 'Audio equipment and accessories',
        parent_id: 1,
      },
    ],
  };