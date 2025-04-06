import React from 'react';

function About() {
  return (
    <div className="about-page" style={{ backgroundColor: '#fff0f6', minHeight: '100vh', padding: '60px 20px' }}>
      <div className="container text-center">
        <h1 style={{ fontFamily: 'Georgia, serif', color: '#b5179e', fontWeight: 'bold', marginBottom: '20px' }}>
          About ZealFashion
        </h1>
        <p style={{ fontSize: '18px', color: '#333', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          ZealFashion is your one-stop destination for everything from beauty and fashion to electronics and home essentials. 
          We aim to deliver top-quality products at affordable prices with a touch of elegance and trend. 
          Our team is passionate about bringing you the latest and best—from trending styles to tech gadgets—all with fast delivery and secure shopping.
        </p>

        <div style={{ marginTop: '40px' }}>
          <h4 style={{ color: '#d63384' }}>Why Choose Us?</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '16px', color: '#555' }}>
            <li>✅ Trusted Brands</li>
            <li>✅ Fast Delivery</li>
            <li>✅ Secure Payments</li>
            <li>✅ 24/7 Customer Support</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div style={{ marginTop: '50px' }}>
          <h4 style={{ color: '#d63384' }}>Contact Us</h4>
          <p style={{ fontSize: '16px', color: '#555' }}>
            📧 Email: <a href="mailto:support@zealfashion.com" style={{ color: '#b5179e' }}>support@zealfashion.com</a><br />
            📞 Phone: <a href="tel:+919703284337" style={{ color: '#b5179e' }}>+91 9703284337</a><br />
            📸 Instagram: <a href="https://www.instagram.com/zealfashion" target="_blank" rel="noreferrer" style={{ color: '#b5179e' }}>@zealfashion</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
