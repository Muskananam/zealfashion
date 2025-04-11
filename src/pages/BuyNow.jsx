import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BuyNowPage.css';

const BuyNowPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const singleProduct = state?.product;
  const cartItems = state?.cartItems;

  const products = singleProduct ? [singleProduct] : cartItems || [];

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', state: '', zip: '', country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleOrder = async () => {
    const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';

    const orderData = {
      email: userEmail,
      products: products.map(p => ({
        productId: p._id,
        name: p.name || p.productName,
        price: p.price,
        quantity: p.quantity || 1
      })),
      address,
      paymentMethod,
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      alert(' Your order is confirmed!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(' Failed to place order');
    }
  };

  return (
    <div className="buy-now-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-grid">
        {/* Left section: steps */}
        <div className="checkout-left">
          {step === 1 && (
            <div className="checkout-box">
              <h3 className="step-title">Step 1: Delivery Address</h3>
              <div className="input-grid-vertical">
                <input className="input" placeholder="Full Name" onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                <input className="input" placeholder="Street" onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                <input className="input" placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                <input className="input" placeholder="State" onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                <input className="input" placeholder="Zip Code" onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                <input className="input" placeholder="Country" onChange={(e) => setAddress({ ...address, country: e.target.value })} />
              </div>
              <button onClick={() => setStep(2)} className="next-btn">Next</button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-box">
              <h3 className="step-title">Step 2: Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="option-title">Cash on Delivery</span>
                  <div className="option-desc">Pay when item is delivered</div>
                </label>

                <label className={`payment-option ${paymentMethod === 'Card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="option-title">Credit / Debit Card</span>
                  <div className="option-desc">Pay using Visa, MasterCard, etc.</div>
                </label>
              </div>
              <button onClick={() => setStep(3)} className="next-btn">Next</button>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-box">
              <h3 className="step-title">Step 3: Confirm Order</h3>
              {products.map((item, idx) => (
                <div key={idx}>
                  <p><strong>Product:</strong> {item.name || item.productName}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity || 1}</p>
                  <hr />
                </div>
              ))}
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
              <button onClick={handleOrder} className="confirm-btn">Place Order</button>
            </div>
          )}
        </div>

        {/* Right section: Order Summary */}
        <div className="checkout-right">
          <h3 className="step-title">Order Summary</h3>
          {products.map((item, idx) => (
            <div className="summary-item" key={idx}>
              <p>{item.name || item.productName}</p>
              <p className="price">₹{item.price} x {item.quantity || 1}</p>
            </div>
          ))}
          <p>
            <strong>Total:</strong> ₹
            {products.reduce((total, item) => total + item.price * (item.quantity || 1), 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;


