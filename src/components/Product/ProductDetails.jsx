import { useParams, Link } from 'react-router-dom';
import { products } from './product.data.js';

function ProductDetails() {
  const { id } = useParams();
  let product = products.find((prod) => prod.id === id);

  if (!product) {
	return <div>Product not found</div>;
  }
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.info}</p>
      <p>Price: {product.price}</p>
      <Link to="/">Back to Products</Link>
    </div>
  );
}

export default ProductDetails;
