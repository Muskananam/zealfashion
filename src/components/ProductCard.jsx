import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

  //  Add product to cart (backend + frontend)
  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:3000/cart", {
        productId: product._id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        email: userEmail,
      });

      console.log(" Product added to cart in backend:", response.data);
      addToCart(product); // frontend state update
    } catch (error) {
      console.error(" Error adding to cart in backend:", error);
    }
  };

  //  Buy Now: Add to cart in backend, then go to buy-now page
  const handleBuyNow = async () => {
    try {
      await axios.post("http://localhost:3000/cart", {
        productId: product._id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        email: userEmail,
      });

      console.log("🛒 Added to cart for Buy Now. Navigating to checkout...");
      navigate('/buy-now', { state: { product } });
    } catch (error) {
      console.error(" Error during Buy Now:", error);
    }
  };

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="btn btn-success ml-2" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
