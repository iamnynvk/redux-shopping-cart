import React, { useState, useEffect } from "react";
import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/productSlice";
import ReactLoading from "react-loading";

const Products = () => {
  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.product.data);
  const status = useSelector((state) => state.product.status);
  //   const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProduct());
    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   setProducts(data);
    // };
    // fetchProducts();
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  return (
    <div className="productsWrapper">
      {status === "Loading" ? (
        <div>
          <h2>
            <ReactLoading
              type={"spin"}
              color="#000"
              height={"20%"}
              width={"20%"}
            />
          </h2>
        </div>
      ) : (
        productItem.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} />
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button className="btn" onClick={() => handleAdd(product)}>
              Add to cart
            </button>
          </div>
        ))
      )}

      {status === "Error" && <h1>Something went wrong</h1>}
    </div>
  );
};

export default Products;
