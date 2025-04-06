import React, { useEffect, useState } from "react";
import "./Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchCart(); // Fetch the cart when the component mounts
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/cart/${userEmail}`);
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
      await axios.delete(`http://localhost:3000/cart/${userEmail}/${_Id}`);
      const updatedItems = cartItems.filter(item => item._Id !== _Id);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:3000/cart/clear/${userEmail}`);
      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy items for total ₹${total}`);
    // Add checkout logic here
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
                          removeFromCart(item._Id);
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
