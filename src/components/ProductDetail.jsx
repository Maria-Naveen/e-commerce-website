import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { addTOCart } from "../slices/cartSlice";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.products.find((prod) => prod.id === productId)
  );
  return (
    <div>
      <img src={product.image} alt={product.title} />
      <h1 className="mt-4 text-2xl font-bold">{product.title}</h1>
      <p className="mt-2 text-lg">{product.price}</p>
      <p className="mt-2">{product.category}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
