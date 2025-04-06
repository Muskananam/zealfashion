import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo from '../assets/logo.jpg';
import { FaShoppingCart, FaHome, FaUserPlus, FaSearch } from 'react-icons/fa';

function Navbar() {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', search);
  };

  return (
    <nav
      className="navbar navbar-expand-lg w-100"
      style={{
        background: 'linear-gradient(to right, #f72585, #b5179e)',
        padding: '0.75rem 1rem',
      }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <NavLink
          className="navbar-brand"
          to="/"
          style={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
            fontSize: '28px',
            color: 'white',
          }}
        >
          ZEAL FASHION
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white d-flex align-items-center" to="/">
                <FaHome style={{ marginRight: '5px' }} />
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white d-flex align-items-center" to="/cart">
                <FaShoppingCart style={{ marginRight: '8px' }} />
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/about">
                About Us
              </NavLink>
            </li>
          </ul>

          {/* Search Input with Icon inside */}
          <form className="d-flex me-3 position-relative" onSubmit={handleSearch}>
            <span
              className="position-absolute"
              style={{ top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#b5179e' }}
            >
              <FaSearch />
            </span>
            <input
              className="form-control ps-5"
              type="search"
              placeholder="Search in Zeal Fashion"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: '1000px' }}
            />
          </form>

          {/* Signup */}
          <NavLink
            to="/signup"
            className="d-flex align-items-center text-decoration-none"
          >
            <FaUserPlus style={{ marginRight: '8px', color: 'white' }} />
            <span className="nav-link text-white">Signup</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
