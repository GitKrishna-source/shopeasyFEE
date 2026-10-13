import React, { useReducer } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Headphones", price: 2000 },
  { id: 3, name: "Keyboard", price: 1500 },
  { id: 4, name: "Mouse", price: 800 },
];

function cartReducer(cart, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = cart.find(
        (item) => item.id === action.product.id
      );

      if (existingItem) {
        return cart.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...cart, { ...action.product, quantity: 1 }];
    }

    case "INCREASE":
      return cart.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return cart
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE":
      return cart.filter((item) => item.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return cart;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <h1>ShopEasy</h1>

      <h2>Products</h2>

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <button
              onClick={() =>
                dispatch({
                  type: "ADD_ITEM",
                  product: product,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
              </div>

              <div className="quantity">
                <button
                  onClick={() =>
                    dispatch({ type: "DECREASE", id: item.id })
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch({ type: "INCREASE", id: item.id })
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove"
                onClick={() =>
                  dispatch({ type: "REMOVE", id: item.id })
                }
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <button
            className="clear"
            onClick={() => dispatch({ type: "CLEAR" })}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default App;
