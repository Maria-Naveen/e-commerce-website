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
  }, [dispatch]);

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
    console.log(id);
    navigate(`/product/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {randomProducts.map((product) => (
        <div
          key={product.id}
          className="relative flex flex-col items-center shadow-lg shadow-white-500/50 p-4 group"
          onClick={() => handleProductClick(product.id)}
        >
          <img
            className="w-64 h-64 p-3"
            src={product.image}
            alt={product.title}
          />
          <p className="w-full mt-2 text-center font-semibold truncate">
            {product.title}
          </p>
          <p>
            <span className="text-blue-600 font-bold">Price:</span>{" "}
            {product.price}
          </p>
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <p className="mt-2 text-gray-600">Rating: {product.rating.rate}</p>
            <p className="text-gray-600">
              Total Reviews: {product.rating.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
