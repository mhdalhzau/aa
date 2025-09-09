-- Database Structure Export for POS Application
-- Generated on: 2025-09-09

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "gen_random_uuid";

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  address text,
  phone varchar(50),
  timezone varchar(50) DEFAULT 'Asia/Jakarta',
  currency varchar(10) DEFAULT 'IDR',
  low_stock_threshold integer DEFAULT 5,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  email varchar(255) UNIQUE,
  phone varchar(50),
  role varchar(50) NOT NULL DEFAULT 'cashier',
  password_hash text NOT NULL,
  store_ids json DEFAULT '[]',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name varchar(255) NOT NULL,
  sku varchar(100) NOT NULL,
  price_buy decimal(12,2) NOT NULL,
  price_sell decimal(12,2) NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  unit varchar(50) DEFAULT 'pcs',
  category varchar(100),
  description text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name varchar(255) NOT NULL,
  phone varchar(50),
  email varchar(255),
  address text,
  balance decimal(12,2) DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id),
  invoice_number varchar(100) NOT NULL,
  items json NOT NULL,
  subtotal decimal(12,2) NOT NULL,
  discount decimal(12,2) DEFAULT 0,
  tax decimal(12,2) DEFAULT 0,
  total decimal(12,2) NOT NULL,
  payment_status varchar(20) NOT NULL DEFAULT 'unpaid',
  payment_method varchar(50),
  notes text,
  offline_id varchar(100),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Debts table
CREATE TABLE IF NOT EXISTS debts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  amount decimal(12,2) NOT NULL,
  paid_amount decimal(12,2) DEFAULT 0,
  due_date timestamp,
  status varchar(20) DEFAULT 'pending',
  reminder_sent boolean DEFAULT false,
  last_reminder_date timestamp,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Debt payments table (for installments)
CREATE TABLE IF NOT EXISTS debt_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  debt_id uuid NOT NULL REFERENCES debts(id) ON DELETE CASCADE,
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  amount decimal(12,2) NOT NULL,
  payment_method varchar(50),
  notes text,
  created_at timestamp DEFAULT now()
);

-- Stock movements table
CREATE TABLE IF NOT EXISTS stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  type varchar(20) NOT NULL,
  quantity integer NOT NULL,
  reference varchar(255),
  notes text,
  created_at timestamp DEFAULT now()
);

-- Cash flow entries table
CREATE TABLE IF NOT EXISTS cash_flow_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  type varchar(20) NOT NULL,
  category varchar(100) NOT NULL,
  description text NOT NULL,
  amount decimal(12,2) NOT NULL,
  payment_method varchar(50),
  reference varchar(255),
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  store_id uuid REFERENCES stores(id),
  action varchar(100) NOT NULL,
  entity_type varchar(50) NOT NULL,
  entity_id uuid,
  payload json,
  created_at timestamp DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_customers_store_id ON customers(store_id);
CREATE INDEX IF NOT EXISTS idx_transactions_store_id ON transactions(store_id);
CREATE INDEX IF NOT EXISTS idx_transactions_customer_id ON transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_debts_store_id ON debts(store_id);
CREATE INDEX IF NOT EXISTS idx_debts_customer_id ON debts(customer_id);
CREATE INDEX IF NOT EXISTS idx_cash_flow_entries_store_id ON cash_flow_entries(store_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_product_id ON stock_movements(product_id);