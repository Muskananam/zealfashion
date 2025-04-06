import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import banner1 from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import banner6 from "../assets/banner6.jpg";
import men from "../assets/men.jpg";
import women from "../assets/women.jpg";
import beauty1 from "../assets/beauty1.jpg";
import frock from "../assets/frock.jpg";
import ear from "../assets/ear.jpg";
import electronics from "../assets/electronics.jpg";

import mobiles from "../assets/mobiles.jpg";
import fashion from "../assets/fashion.jpg";
import bangles from "../assets/bangles.jpg";
import beauty from "../assets/beauty.jpg";
import sports from "../assets/sports.jpg";
import books from "../assets/books.jpg";
import toys from "../assets/toys.jpg";
import pads from "../assets/pads.jpg";
import hoit from "../assets/hoit.jpg";
import glosary from "../assets/glosary.jpg";
import gadgets from "../assets/gadgets.jpg";
import food from "../assets/food.jpg";
import vehicle from "../assets/vehicle.jpg";
import watch from "../assets/watch.jpg";
import rings from "../assets/rings.png";
import shoes from "../assets/shoes.jpg";
import jew from "../assets/jew.jpg";
import bedsheet from "../assets/bedsheet.jpg";
import car from "../assets/car.jpg";
import frock1 from "../assets/frock1.jpg";
import saree1 from "../assets/saree1.jpg";
import men1 from "../assets/men1.jpg";
import men2 from "../assets/men2.jpg";
import dupatta from "../assets/dupatta.jpg";

function Home() {
  const carouselRef = useRef(null);

  const smallCategories = [
    { name: "Mobiles", image: mobiles, link: "/mobiles" },
    { name: "Fashion", image: fashion, link: "/fashion" },
    { name: "Bangles", image: bangles, link: "/bangles" },
    { name: "Beauty", image: beauty, link: "/beauty" },
    { name: "Sports", image: sports, link: "/sports" },
    { name: "Books", image: books, link: "/books" },
    { name: "Toys", image: toys, link: "/toys" },
    { name: "Pads", image: pads, link: "/pads" },
    { name: "Home Item", image: hoit, link: "/hoit" },
    { name: "Glosary", image: glosary, link: "/glosary" },
    { name: "Gadget", image: gadgets, link: "/gadgets" },
    { name: "Food", image: food, link: "/food" },
    { name: "Watch", image: watch, link: "/watch" },
    { name: "Vehicle", image: vehicle, link: "/vehicle" },
    { name: "Rings", image: rings, link: "/rings" },
    { name: "Shoes", image: shoes, link: "/shoes" },
    { name: "Jewellery", image: jew, link: "/jew" },
    { name: "Bedsheet", image: bedsheet, link: "/bedsheet" },
    { name: "Car", image: car, link: "/car" },
    { name: "Frock", image: frock1, link: "/frock1" },
    { name: "Saree", image: saree1, link: "/saree1" },
    { name: "Blazer", image: men1, link: "/men1" },
    { name: "kurta", image: men2, link: "/men2" },
    { name: "Dupatta", image: dupatta, link: "/dupatta" },
  ];

  const salesProducts = [
    { id: 1, name: "Wireless Earbuds", price: "₹4,999", discount: "20% OFF" },
    { id: 2, name: "Smartwatch", price: "₹9,999", discount: "15% OFF" },
    { id: 3, name: "Gaming Mouse", price: "₹2,999", discount: "10% OFF" },
    { id: 4, name: "Bluetooth Speaker", price: "₹3,999", discount: "25% OFF" },
    { id: 5, name: "Laptop Stand", price: "₹1,999", discount: "30% OFF" },
    { id: 6, name: "Mobile Phone", price: "₹5,999", discount: "30% OFF" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const carouselElement = carouselRef.current;
      const carouselInstance = new window.bootstrap.Carousel(carouselElement);
      carouselInstance.next();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-page">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" ref={carouselRef}>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100" alt="Banner 1" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100" alt="Banner 2" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100" alt="Banner 3" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={banner4} className="d-block w-100" alt="Banner 4" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={banner5} className="d-block w-100" alt="Banner 5" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src={banner6} className="d-block w-100" alt="Banner 6" style={{ height: "500px", objectFit: "cover" }} />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className="small-categories-container">
        {smallCategories.map((cat, index) => (
          <Link to={cat.link} key={index} className="small-category-card">
            <img src={cat.image} alt={cat.name} />
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>

      <div className="container my-5">
        <h2 className="text" style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>FAVORITE BRANDS FOR YOU</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src={men} className="card-img-top" alt="Men" />
              <div className="card-body">
                <h5 className="card-title">Men</h5>
                <Link to="/products" state={{ category: "Men" }} className="btn btn-outline-primary">Explore</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={women} className="card-img-top" alt="Women" />
              <div className="card-body">
                <h5 className="card-title">Women</h5>
                <Link to="/products" state={{ category: "Women" }} className="btn btn-outline-primary">Explore</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={electronics} className="card-img-top" alt="Electronics" />
              <div className="card-body">
                <h5 className="card-title">Electronics</h5>
                <Link to="/products" state={{ category: "Electronics" }} className="btn btn-outline-primary">Explore</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={frock} className="card-img-top" alt="Frock" />
              <div className="card-body">
                <h5 className="card-title">Disginer Frocks</h5>
                <Link to="/products" state={{ category: "Frocks" }} className="btn btn-outline-primary">Explore</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src={beauty1} className="card-img-top" alt="Beauty1" />
              <div className="card-body">
                <h5 className="card-title">Beauty</h5>
                <Link to="/products" state={{ category: "Beauty" }} className="btn btn-outline-primary">Explore</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src={ear} className="card-img-top" alt="Ear" />
              <div className="card-body">
                <h5 className="card-title">Earrings</h5>
                <Link to="/products" state={{ category: "Earrings" }} className="btn btn-outline-primary">Explore</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text" style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>BEST OF BRAND OFFERS</h2>
        <div className="row">
          {salesProducts.map((product) => (
            <div className="col-lg-4 col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="card sales-card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="price">{product.price} <span className="discount">{product.discount}</span></p>
                  <button className="btn btn-success">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us-section bg-light p-5 mt-5 border-top">
        <div className="container">
          <h3 className="mb-4" style={{ fontWeight: 'bold', fontFamily: 'Georgia, serif', color: '#d63384' }}>
            About Us
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Welcome to our shopping platform – your one-stop destination for fashion, electronics, beauty, home essentials and more. We’re committed to delivering an effortless shopping experience, offering a wide range of high-quality products at the best prices.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Our mission is to make online shopping easy, enjoyable, and accessible to everyone. From trending styles to trusted brands, we’ve handpicked everything just for you.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Shop with confidence and convenience, and enjoy fast delivery, safe payment options, and dedicated customer support.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: 0 }}>
            Thank you for choosing us. Happy shopping!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
