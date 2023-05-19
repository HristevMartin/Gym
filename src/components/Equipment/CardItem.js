import React from 'react';
import { useState } from 'react';
import { Spinner } from '../Spinner/Spinner.js';


const CardItem = ({ product }) => {

  return (
    <div className="card-items">
      <div className="card-items-image">
        <img style={{ 'background-color': 'white' }}
          src={product.image_url}
          alt={product.name}

        />
      </div>



      <div className="card-text">
        <h1>Name: {product.name}</h1>
        <p>Price:</p>
        <p>{product.price}£</p>
        <button>
          <a href={`/item-details/${product.item_id}`}>View More</a>
        </button>
      </div>
    </div>
  );
};

export default CardItem;
