🛒 BlueCart
A fullstack e-commerce web application built with React + Redux on the frontend and Node.js + Express + MongoDB on the backend.

🚀 Live Features

🔍 Search — search products by name in real time
🗂️ Category Filtering — filter products by category via navbar dropdown
🛍️ Add to Cart — add products from the product modal
🛒 Cart Page — update quantities, remove items, view order summary
💳 Checkout — form with full validation and auto-formatting for card/expiry
✅ Order Confirmation — success screen after placing an order
💾 Persistent Cart — cart saved to localStorage, survives page refresh
🌐 Own REST API — custom backend serving all product, category, and order data


🧱 Tech Stack
Frontend
TechPurposeReact + ViteUI frameworkRedux ToolkitGlobal state (cart, search, category)React IconsIcon library
Backend
TechPurposeNode.js + ExpressREST API serverMongoDB + MongooseDatabase and ODMdotenvEnvironment variable managementcorsCross-origin request handling

📁 Project Structure
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

🔌 API Endpoints
MethodEndpoint                      Description
GET/api/productsGet                 all products
GET/api/products/:id                Get single product
GET/api/products/search?q=          Search products
GET/api/products/category/:name     Filter by category
GET/api/categories                  Get all categories
POST/api/orders                     Place a new order
GET/api/orders                      Get all orders


🔮 Planned Features

 Product detail page (replace modal with dedicated route)
 Wishlist
 Sort & filter by price / rating
 Pagination
 Toast notifications
 User authentication


👨‍💻 Author
Ekak Basu
GitHub: @ebro125