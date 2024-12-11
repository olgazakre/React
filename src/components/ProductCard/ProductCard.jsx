import styles from './ProductCard.module.css';
import API_URL from '../../utils/api';
import React from 'react';
import { Link } from 'react-router-dom';
import ButtonAdd from '../ButtonAdd/ButtonAdd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    event.stopPropagation(); 
    event.preventDefault(); 
    dispatch(addToCart({ ...product, quantity: 1 }));
  };


    if (product.discont_price !== null) {
    const discountPercentage = Math.round(
      100 * ((product.price - product.discont_price) / product.price)
    );
    return (
      <div key={product.id} className={styles.element}>
        <Link to={`/ProductDetails/${product.id}`}>
          <div className={styles.discountBadge}>-{discountPercentage}%</div>
          <img src={`${API_URL}${product.image}`} alt={product.title} />
          <h3>{product.title}</h3>
          <div className={styles.priceCont}>
            <h2>${product.discont_price}</h2>
            <p>${product.price}</p>
          </div>
        </Link>
        <div className={styles.buttonAdd}>
        <ButtonAdd onClick={handleAddToCart}/>
        </div>
      </div>
    );
  } else {
    return (
      <div key={product.id} className={styles.element}>
        <Link to={`/ProductDetails/${product.id}`}>
          <img src={`${API_URL}${product.image}`} alt={product.title} />
          <h3>{product.title}</h3>
          <div className={styles.priceCont}>
            <h2>${product.price}</h2>
          </div>
        </Link>
        <div className={styles.buttonAdd}>
        <ButtonAdd onClick={handleAddToCart}/>
        </div>
      </div>
    );
  }
}
