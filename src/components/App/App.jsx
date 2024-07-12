import { Routes, Route } from 'react-router-dom';
import Product from '../Product/Product.jsx';
import ProductDetails from '../Product/ProductDetails.jsx';

function App({products}) {

  return (
      <Routes>
        <Route path="/" element={<Product products={products} />} />
        <Route path="/products/:id" element={<ProductDetails products={products} />} />
      </Routes>
  );
}

export default App;