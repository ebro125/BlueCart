import React, { useState, useEffect } from 'react';
import ProductList from './component/ProductList/ProductList';
import Navbar from './component/NavBar/NavBar'


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  return (
    <>
     <Navbar />
      <main>
        {loading ? (
          <div className="loader">Loading BlueCart products...</div>
        ) : (
          <ProductList products={products} />
        )}
      </main>
    </>
  )
}

export default App
