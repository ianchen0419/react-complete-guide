import { useParams } from 'react-router-dom';

function ProductDetail() {
  const params = useParams();

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </section>
  );
}

export default ProductDetail;
