import React, { useState } from 'react';
import ProductList from './component/ProductList/ProductList';
import Navbar from './component/NavBar/NavBar';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Navbar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <main>
        <ProductList selectedCategory={selectedCategory} />
      </main>
    </>
  );
}

export default App;