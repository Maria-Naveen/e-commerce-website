import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../slices/apiData"; //async API call

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const jewelery = products.filter((prod) => prod.category === "jewelery");
  const mensClothing = products.filter(
    (prod) => prod.category === "men's clothing"
  );
  const electronics = products.filter(
    (prod) => prod.category === "electronics"
  );
  const womensClothing = products.filter(
    (prod) => prod.category === "women's clothing"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4 p-4 bg-green-200">
      {womensClothing.map((product) => (
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
