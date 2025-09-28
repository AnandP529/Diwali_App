import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

// Import one image per category
import SparklesImg from "../../Assests/Diwali_Images/Sparkles.jpg";
import ChakarasImg from "../../Assests/Diwali_Images/Chakaras.jpg";
import FlowerpotsImg from "../../Assests/Diwali_Images/Flowerpots.jpg";
import BombsImg from "../../Assests/Diwali_Images/Bombs.jpg";
import SkyshotImg from "../../Assests/Diwali_Images/Skyshot.jpg";
import RocketsImg from "../../Assests/Diwali_Images/Rockets.jpg";
import PackcomboImg from "../../Assests/Diwali_Images/Combopack.jpg";
import MatchboxImg from "../../Assests/Diwali_Images/Matchbox.jpg";
import GunImg from "../../Assests/Diwali_Images/Gun.jpg";
import DiyasImg from "../../Assests/Diwali_Images/Diyas.jpg";

// Category list
const categories = [
  { id: 1, name: "Sparklers", image: SparklesImg },
  { id: 2, name: "Chakaras", image: ChakarasImg },
  { id: 3, name: "Flowerpots", image: FlowerpotsImg },
  { id: 4, name: "Bombs", image: BombsImg },
  { id: 5, name: "Sky Shots", image: SkyshotImg },
  { id: 6, name: "Rockets", image: RocketsImg },
  { id: 7, name: "Combo Packs", image: PackcomboImg },
  { id: 8, name: "Matchbox", image: MatchboxImg },
  { id: 9, name: "Guns", image: GunImg },
  { id: 10, name: "Diyas", image: DiyasImg },
];

const Products = () => {
  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="products-container">
        {categories.map((category) => (
          <div className="product-card" key={category.id}>
            <img src={category.image} alt={category.name} />
            <div className="product-info">
              <h3>{category.name}</h3>
            </div>
            <Link to={`/product/${category.name.replace(/\s+/g, "-")}`}>
              <button className="view-button">View Items</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
