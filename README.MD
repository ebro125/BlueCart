# BlueCart

A fullstack e-commerce web application built with React + Redux on the frontend and Node.js + Express + MongoDB on the backend.

---

## Live Features

- **Search** — search products by name in real time
- **Category Filtering** — filter products by category via navbar dropdown
- **Add to Cart** — add products from the product modal
- **Cart Page** — update quantities, remove items, view order summary
- **Checkout** — form with full validation and auto-formatting for card/expiry
- **Order Confirmation** — success screen after placing an order
- **Persistent Cart** — cart saved to localStorage, survives page refresh
- **Own REST API** — custom backend serving all product, category, and order data

---

## Tech Stack

### Frontend

| Tech | Purpose |
|------|---------|
| React + Vite | UI framework |
| Redux Toolkit | Global state (cart, search, category) |
| React Icons | Icon library |

### Backend

| Tech | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |

---

## Project Structure

```
BlueCart/
├── blueCart/                   # React frontend
│   └── src/
│       ├── services/
│       │   └── api.js          # All API calls in one place
│       ├── store/
│       │   └── slices/
│       │       ├── cartSlice.js
│       │       ├── categorySlice.js
│       │       └── searchSlice.js
│       └── component/
│           ├── NavBar/
│           ├── ProductList/
│           ├── ProductCard/
│           ├── Cart/
│           └── Checkout/
│
└── bluecart-backend/           # Node.js backend
    ├── server.js
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── Product.js
    │   └── Order.js
    ├── routes/
    │   ├── products.js
    │   ├── categories.js
    │   └── orders.js
    ├── controllers/
    │   ├── productController.js
    │   ├── categoryController.js
    │   └── orderController.js
    └── seed.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/search?q=` | Search products |
| GET | `/api/products/category/:name` | Filter by category |
| GET | `/api/categories` | Get all categories |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders` | Get all orders |

---



> Make sure the backend is running before starting the frontend.

---

## Redux State Shape

```js
{
  cart:     { items: [] },
  category: { selected: null },
  search:   { query: '' }
}
```

---

## Data Seeding

Products are seeded from [DummyJSON](https://dummyjson.com) using the `seed.js` script. Once seeded, the app is fully independent and no longer depends on DummyJSON.

```bash
node seed.js
```

---

## Planned Features

- [ ] Product detail page (replace modal with dedicated route)
- [ ] Wishlist
- [ ] Sort and filter by price / rating
- [ ] Pagination
- [ ] Toast notifications
- [ ] User authentication

---

## Author

**Ekak Basu**
GitHub: [@ebro125](https://github.com/ebro125)
