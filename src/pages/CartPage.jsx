import React, { useEffect, useState } from "react";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const userEmail = localStorage.getItem("userEmail")?.toLowerCase();
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail) {
      fetchCart();
    }
  }, [userEmail]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/cart/${userEmail}`);
      setCartItems(res.data);
      calculateTotal(res.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${userEmail}/${productId}`);
      const updatedItems = cartItems.filter(item => item._id !== productId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!userEmail) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      const confirmClear = window.confirm("Are you sure you want to clear the entire cart?");
      if (!confirmClear) return;

      const res = await axios.delete(`http://localhost:3000/api/cart/clear/${userEmail}`);
      
      console.log("Clear cart response:", res);

      if (res.status === 200) {
        setCartItems([]);
        setTotal(0);
        alert(res.data.message || "Cart cleared successfully");
      } else {
        alert("Something went wrong while clearing the cart.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("An error occurred while clearing the cart. Please try again.");
    }
  };

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate('/buy-now', { state: { cartItems } });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">No items in the cart yet. Start shopping!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="card mb-3 shadow-sm">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item?.image || "https://via.placeholder.com/150"}
                    alt={item?.productName}
                    className="img-fluid rounded-start"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item?.productName}</h5>
                    <p className="card-text">Price: ₹{item?.price}</p>
                    <p className="card-text">Quantity: {item?.quantity}</p>
                    <p className="card-text">
                      Subtotal: ₹{item?.price * item?.quantity}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this item?")) {
                          removeFromCart(item._id);
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <h4>Total: ₹{total}</h4>
            <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
              <button className="btn btn-primary" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="btn btn-warning" onClick={clearCart}>
                Clear Cart
              </button>
              <Link to="/products" className="btn btn-success">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
