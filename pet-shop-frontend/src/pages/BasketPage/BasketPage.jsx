import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, } from '../../redux/slices/basketSlice'
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import styles from './BasketPage.module.css';

const BasketPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [ isModalVisible, setIsModalVisible ] = useState(false)

   const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки данных, если будет бекенд

    setIsModalVisible(true); // показать модалку
    e.target.reset(); // очистить форму
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Shopping cart</h2>
          <div className={styles.titleLine}></div>
          <Link to='/'>
            <Button type='default' className={styles.titleBtn}>Back to the store</Button>
          </Link>
        </div>
        <div>
          <p>Looks like you have no items in your basket currently.</p>
        </div>
        <Link to='/all-products'>
          <Button type='primary' className={styles.ContShop}>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartWrapper}>
      {/* Cart items section */}
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div className={styles.cartItem} key={item.id}>
            <img
              src={`http://localhost:3333/${item.image}`}
              alt={item.title}
              className={styles.itemImage}
            />
            <div className={styles.itemContent}>
              <div className={styles.itemHeader}>
                <h3>{item.title}</h3>
                <button onClick={() => dispatch(removeFromCart(item.id))}>×</button>
              </div>
              <div className={styles.itemControls}>
                <button onClick={() => dispatch(removeFromCart(item.id))}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))}>+</button>
              </div>
            </div>
            <div className={styles.itemPrice}>
              <strong>${(item.discont_price || item.price) * item.quantity}</strong>
              {item.discont_price && (
                <span className={styles.oldPrice}>${item.price * item.quantity}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order summary section */}
      <div className={styles.orderDetails}>
        <h2>Order details</h2>
        <p>{totalCount} items</p>
        <h3>Total <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span></h3>

        <form className={styles.orderForm} onSubmit={handleOrderSubmit}>
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Phone number" required />
          <input type="email" placeholder="Email" required />
          <button type="submit" className={styles.orderBtn}>Order</button>
        </form> 
      </div>
      <Modal
        title='Congratulations!'
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        className={styles.modal}
      >
        <p>Your order has been successfully placed on the website.</p>
        <p>A manager will contact you shortly to confirm your order.</p>
      </Modal>
    </div>
  );
};

export default BasketPage

