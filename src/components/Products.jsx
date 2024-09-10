import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../slices/apiData"; //async API call
import { useParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { categoryName } = useParams();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const filteredProducts = categoryName
    ? products.filter((prod) => prod.category === categoryName)
    : products;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4 p-4 bg-green-200">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="w-full flex flex-col items-center shadow-lg shadow-white-500/50"
        >
          <img
            className="w-1/2 h-44 object-cover"
            src={product.image}
            alt={product.title}
          />
          <p className="mt-2 text-lg font-semibold">{product.title}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
