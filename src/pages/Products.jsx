import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Products() {
  const location = useLocation();
  const selectedCategory = location.state?.category || null;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const allProducts = [
      { id: 1, productName: "Dress 1", price: 999, image: "https://via.placeholder.com/250", category: "Women" },
      { id: 2, productName: "Dress 2", price: 1099, image: "https://via.placeholder.com/250", category: "Women" },
      { id: 3, productName: "Dress 3", price: 1199, image: "https://via.placeholder.com/250", category: "Women" },
      { id: 4, productName: "Dress 4", price: 899, image: "https://via.placeholder.com/250", category: "Women" },
      { id: 5, productName: "Dress 5", price: 1299, image: "https://via.placeholder.com/250", category: "Women" },
    ];

    if (selectedCategory === "Women") {
      setProducts(allProducts.filter(p => p.category === "Women"));
    } else {
      setProducts(allProducts);
    }
  }, [selectedCategory]);

  const handleAddToCart = async (product) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      return alert("Please sign in to add items to cart.");
    }

    const quantity = parseInt(prompt("Enter quantity:", "1"), 10);
    if (!quantity || quantity < 1) {
      return alert("Invalid quantity.");
    }

    try {
      const cartItem = {
        email,
        productId: product.id.toString(),
        productName: product.productName,
        quantity,
        price: product.price,
        image: product.image,
      };

      await axios.post("http://localhost:3000/cart", cartItem);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const handleBuyNow = (product) => {
    const quantity = parseInt(prompt("Enter quantity to buy now:", "1"), 10);
    if (!quantity || quantity < 1) {
      return alert("Invalid quantity.");
    }

    const total = product.price * quantity;
    alert(`Proceeding to buy ${quantity} × ${product.productName} for ₹${total}`);
    // You can implement further checkout logic here
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">
        {selectedCategory ? `${selectedCategory} Products` : "All Products"}
      </h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.productName}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">₹{product.price}</p>
                <div className="mt-auto d-grid gap-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
