import React from 'react';
import { useState } from 'react';
import { Spinner } from '../Spinner/Spinner.js';


const CardItem = ({ product }) => {
  let imageUrl = product.image_url_path


  const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

  return (
    <div className="card-items">
      <div className="card-items-image">
        <img style={{ 'background-color': 'white' }}
          src={`${imageUrl}`}
          alt={product.name}

        />
      </div>



      <div className="card-text">
        <h1>Name: {product.name}</h1>
        <p>Price:</p>
        <p>{product.price}£</p>
        <button className='card-button'>
          <a href={`/item-details/${product.item_id}`}>View More</a>
        </button>
      </div>
    </div>
  );
};

export default CardItem;
