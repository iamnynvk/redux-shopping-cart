import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => {
    console.log("Cart State :", state.cart);
    return state.cart;
  });

  const handlerRemove = (productID) => {
    dispatch(remove(productID));
  };

  return (
    <div>
      <h3>Cart</h3>
      <div className="cartWrapper">
        {item.map((product) => (
          <div key={product.id} className="cartCard">
            <img src={product.image} />
            <h5>{product.title}</h5>
            <h5>{product.price}</h5>
            <button className="btn" onClick={() => handlerRemove(product.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3>Total: {item.reduce((acc, curr) => acc + curr.price, 0)}</h3>
      </div>
    </div>
  );
};

export default Cart;
