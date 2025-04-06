import React, { createContext, useContext, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// Create CartProvider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to Cart function
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // If product already exists, increase its quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from Cart function
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Clear Cart function
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart Context
export const useCart = () => useContext(CartContext);
