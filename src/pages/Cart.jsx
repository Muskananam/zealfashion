import React, { useEffect, useState } from "react";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/CartContext"; // Import useCart hook
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { cart, setCart } = useCart();  // Get cart items from context
  const [backendCart, setBackendCart] = useState([]);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const email = localStorage.getItem("userEmail") || "guest@example.com";
        const response = await axios.get(`http://localhost:3000/cart/${email}`);
        setBackendCart(response.data);
      } catch (error) {
        console.error("❌ Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Handle removing item from cart
  const removeFromCart = async (productId) => {
    try {
      const email = localStorage.getItem("userEmail") || "guest@example.com";
      await axios.delete(`http://localhost:3000/cart/${email}/${_Id}`); // Delete from backend
      setBackendCart((prevCart) => prevCart.filter(item => item._Id !== _tId)); // Update frontend state
    } catch (error) {
      console.error("❌ Error removing item:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Your Cart</h2>

      {backendCart.length === 0 ? (
        <div className="text-center">
          <p>No items in the cart yet. Start shopping!</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="row">
          {backendCart.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={item.image || "https://via.placeholder.com/250x250?text=No+Image"}
                  className="card-img-top"
                  alt={item.productName}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.productName}</h5>
                  <p className="card-text">${item.price}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item._Id)} // Call remove function
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
