# POS Application API Documentation

## Authentication Endpoints

### POST /api/auth/login
Login with email and password
```json
{
  "email": "admin@pos.com",
  "password": "admin123"
}
```

### POST /api/auth/setup-demo
Create demo user for testing

## Store Management

### GET /api/stores
Get all stores

### POST /api/stores
Create new store
```json
{
  "name": "Store Name",
  "address": "Store Address", 
  "phone": "08123456789",
  "timezone": "Asia/Jakarta",
  "currency": "IDR"
}
```

### GET /api/stores/:id
Get store by ID

### GET /api/stores/:id/dashboard
Get dashboard statistics for store

## Product Management

### GET /api/stores/:storeId/products
Get all products for store

### POST /api/stores/:storeId/products
Create new product
```json
{
  "name": "Product Name",
  "sku": "SKU001",
  "priceBuy": 10000,
  "priceSell": 15000,
  "stock": 100,
  "category": "Electronics",
  "description": "Product description"
}
```

### PUT /api/products/:id
Update product

### DELETE /api/products/:id
Delete product

## Customer Management

### GET /api/stores/:storeId/customers
Get all customers for store

### POST /api/stores/:storeId/customers
Create new customer
```json
{
  "name": "Customer Name",
  "phone": "08123456789",
  "email": "customer@email.com",
  "address": "Customer Address"
}
```

### PUT /api/customers/:id
Update customer

## Transaction Management

### GET /api/stores/:storeId/transactions
Get all transactions for store

### POST /api/stores/:storeId/transactions
Create new transaction
```json
{
  "customerId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "productName": "Product",
      "quantity": 2,
      "price": 15000,
      "discount": 0
    }
  ],
  "subtotal": 30000,
  "discount": 0,
  "tax": 0,
  "total": 30000,
  "paymentStatus": "paid",
  "paymentMethod": "cash"
}
```

### PUT /api/transactions/:id
Update transaction

## Debt Management

### GET /api/stores/:storeId/debts
Get all debts for store

### PUT /api/debts/:id
Update debt

### POST /api/debts/:id/reminder
Send WhatsApp reminder for debt

## Cash Flow Management

### GET /api/stores/:storeId/cashflow
Get cash flow entries for store

### POST /api/stores/:storeId/cashflow
Create cash flow entry
```json
{
  "type": "income",
  "category": "debt",
  "description": "Debt payment from customer",
  "amount": 50000,
  "paymentMethod": "cash",
  "customerId": "uuid"
}
```

### PUT /api/cashflow/:id
Update cash flow entry

### DELETE /api/cashflow/:id
Delete cash flow entry

## Reports

### GET /api/stores/:storeId/reports/sales
Get sales report for date range
Query params: from, to (YYYY-MM-DD format)

## Payment Callback

### POST /api/payment/callback
Handle payment gateway callbacks
```json
{
  "transactionId": "uuid",
  "status": "paid"
}
```

## Response Formats

### Success Response
```json
{
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error