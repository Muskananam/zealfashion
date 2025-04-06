import React from 'react';
import axios from 'axios'; // ✅ Import axios for HTTP requests

function ProductCard({ product, addToCart, buyNow }) {
  // ✅ Function to call backend API
  const handleAddToCart = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail") || "guest@example.com"; // Get email

      // Call the backend API to save the product to MongoDB
      const response = await axios.post("http://localhost:3000/cart", {
        productId: product._id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        email: userEmail,
      });

      console.log("✅ Product added to cart in backend:", response.data);
      addToCart(product); // Call frontend cart function too
    } catch (error) {
      console.error("❌ Error adding to cart in backend:", error);
    }
  };

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button 
          className="btn btn-primary" 
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button 
          className="btn btn-success ml-2" 
          onClick={() => buyNow(product)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
