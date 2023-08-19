import React from 'react';

const CardItem = ({ product }) => {

  let imageUrl = product.image_url_path

  return (
    <div className="card-itemss">

      <div className="card-items-imagee">
        <img  className='card-items-product-img-picturee'
          src={`${imageUrl}`}/>
      </div>

      <div className="card-textt">
        <div className='card-textt-info'>
        <p className="product-namee">Product: {product.name}</p>
        <p className="product-locationn">Location {product.location}</p>
        <p className="product-pricee">Price: {product.price}£</p>
        </div>
        <button className='card-buttonn'>
          <a className='view-more-equipment' href={`/item-details/${product.item_id}`}>View More</a>
        </button>
      </div>

    </div>
  );
};

export default CardItem;
