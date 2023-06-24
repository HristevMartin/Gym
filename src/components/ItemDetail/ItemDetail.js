import './ItemDetail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export const ItemDetails = () => {


  const { itemId } = useParams();

  const [product, setProduct] = useState([]);

  const { user } = useAuth();

  const token = user.token

  let BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

  useEffect(() => {

    


    const fetchProduct = async () => {


      const response = await fetch(`${BASE_URL}/item-detail/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();



      setProduct(data);
    }

    fetchProduct();
  }, [itemId])

  console.log('product', product)

  return (
    <div className='card-details'>
      <div className="product-view">
        <div className='product-info-top'>
          <div>
            <h1>{product.name}</h1>
          </div>
          <div className='product-info'>
            <span className='product-sku'>
              Product code: something
            </span>
          </div>

        </div>

        <div className='product-main'>
          <div className='product-img'>
            <img className='product-img-picture' src={`${BASE_URL}/upload_profile_images/${product.image_url_path}`} />
          </div>

          <div className='product-main-info'>

            <div className='price-wrapper'>
              <ul>
                <li>
                  <span className='price-title'>List Price:</span>
                  <span className='price'>£ {product.price}</span>
                </li>
              </ul>

            </div>

            <div className='card-text'>
              <p style={{ 'color': 'white' }}>
                {product.description}
              </p>
              <div>
                <button><a href='Edit' style={{ 'color': 'white', 'listStyle': 'none', 'textDecoration': 'none' }}>Buy</a></button>
              </div>
              {/* <button><a href='Edit' style={{ 'color': 'white', 'listStyle': 'none', 'textDecoration': 'none' }}>Edit</a></button>
              <button><a href='Edit' style={{ 'color': 'white', 'listStyle': 'none', 'textDecoration': 'none' }}>Delete</a></button> */}

            </div>

          </div>
        </div>

      </div >
      <div className='product-information'>
        <h2>Product Information</h2>
        <div className='attributes-container'>
          <ul>
            <li>
              <span>Adjustable: </span>
              <span>No</span>
            </li>
            <li>
              <span>Quantity: </span>
              <span>1</span>
            </li>
          </ul>
          <ul>
            <li>
              <span>Material: </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
