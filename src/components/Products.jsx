import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../slices/apiData"; //async API call
import { useParams, useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const shuffleArray = (array) => {
    // Create a shallow copy of the array to avoid modifying the original array
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const filteredProducts = categoryName
    ? products.filter((prod) => prod.category === categoryName)
    : products;

  const randomProducts = shuffleArray(filteredProducts).slice(0, 10);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {randomProducts.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center shadow-lg shadow-white-500/50 p-4"
          onClick={() => handleProductClick(product.id)}
        >
          <img
            className="w-full h-44 object-cover"
            src={product.image}
            alt={product.title}
          />
          <p className="mt-2 text-lg font-semibold">{product.title}</p>
          <p>
            <span className="text-blue-600 font-bold">Price:</span>{" "}
            {product.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Products;
