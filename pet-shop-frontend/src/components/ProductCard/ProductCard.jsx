import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import  { addToCart } from '../../redux/slices/basketSlice'
import styles from './ProductCard.module.css';
import { Button } from 'antd';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Handler for adding a product to the cart
  const handleAddToCart = (event) => {
    event.stopPropagation(); // Stopping the propagation of a click event
    event.preventDefault(); // Additionally, we prevent clicking on the link
    dispatch(addToCart({ ...product, quantity: 1 })); // Adding a product with a quantity of 1
  };

  const calculateDiscountPercentage = (price, discountPrice) => {
    if (price && discountPrice) {
      const discount = ((price - discountPrice) / price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <li className={styles.productCard}>
      <Link to={`/products/${product.id}`} className={styles.productLink}>
        <div className={styles.productImageContainer}>
          <img src={`${'http://localhost:3333/products/all'}${product.image}`} alt={product.title} className={styles.productImage} />
          {product.discont_price && (
            <div className={styles.discountFlag}>
              -{calculateDiscountPercentage(product.price, product.discont_price)}%
            </div>
          )}
          <div className={styles.addButtonContainer}>
            <Button onClick={handleAddToCart} />
          </div>
        </div>
        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <div className={styles.priceContainer}>
            {product.discont_price ? (
              <>
                <span className={styles.currentPrice}>${product.discont_price}</span>
                <span className={styles.originalPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.currentPrice}>${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;