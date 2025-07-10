// import React from 'react'
// import { Link } from 'react-router-dom'
// import styles from './BasketPage.module.css'
// import { Button } from 'antd'

// const BasketPage = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.titleContainer}>
//         <h2 className={styles.title}>Shopping cart</h2>
//         <div className={styles.titleLine}></div>
//         <Link to='/'><Button type='default' className={styles.titleBtn}>Back to the store</Button></Link>
//       </div>
//       <div><p>Looks like you have no items in your basket currently.</p></div>
//       <Button type='primary' className={styles.ContShop}>Continue Shopping</Button>
      
//     </div>
//   )
// }

// export default BasketPage

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { incrementQty, decrementQty, removeFromCart } from '../../redux/slices/cartSlice'
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import styles from './BasketPage.module.css'

// function CartPage() {
//     const cartItems = useSelector(state => state.cart.items);
//     const dispatch = useDispatch();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset
//     } = useForm();

//     const onSubmit = async (data) => {
//         const orderData = {
//             customer: data,
//             products: cartItems
//         };

//         try {
//             await axios.post('http://localhost:3333/order/send', orderData);
//             alert('Order successfully sent!');
//             reset();
//         } catch (error) {
//             console.error('Order submission failed:', error);
//         }
//     };

//     const calculateTotal = () => {
//         return cartItems.reduce((total, item) => {
//             const price = item.discont_price || item.price;
//             return total + price * item.quantity;
//         }, 0).toFixed(2);
//     };

//     return (
//         <div className={styles.cartPage}>
//             <h2>Cart</h2>
//             <div className={styles.cartContent}>
//                 <div className={styles.cartItems}>
//                     {cartItems.length === 0 ? (
//                         <p>Your cart is empty.</p>
//                     ) : (
//                         cartItems.map(item => {
//                             const price = item.discont_price || item.price;
//                             return (
//                                 <div key={item.id} className={styles.cartItem}>
//                                     <img src={`http://localhost:3333/${item.image}`} alt={item.title} />
//                                     <div className={styles.info}>
//                                         <h3>{item.title}</h3>
//                                         <p>Price: ${price}</p>
//                                         <div className={styles.qty}>
//                                             <button onClick={() => dispatch(decrementQty(item.id))}>-</button>
//                                             <span>{item.quantity}</span>
//                                             <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
//                                         </div>
//                                         <p>Total: ${(price * item.quantity).toFixed(2)}</p>
//                                         <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     )}
//                     <h3>Total Price: ${calculateTotal()}</h3>
//                 </div>

//                 <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)}>
//                     <h3>Order Details</h3>
//                     <label>
//                         Name:
//                         <input {...register("name", { required: "Name is required" })} />
//                         {errors.name && <p>{errors.name.message}</p>}
//                     </label>
//                     <label>
//                         Phone:
//                         <input {...register("phone", {
//                             required: "Phone is required",
//                             pattern: {
//                                 value: /^[0-9+ -]{6,20}$/,
//                                 message: "Invalid phone number"
//                             }
//                         })} />
//                         {errors.phone && <p>{errors.phone.message}</p>}
//                     </label>
//                     <label>
//                         Email:
//                         <input {...register("email", {
//                             required: "Email is required",
//                             pattern: {
//                                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                 message: "Invalid email"
//                             }
//                         })} />
//                         {errors.email && <p>{errors.email.message}</p>}
//                     </label>
//                     <button type="submit">Place Order</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CartPage;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/basketSlice';
import styles from './BasketPage.module.css'

const BasketPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return <p className={styles.empty}>Корзина пуста</p>;
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        {items.map((item) => (
          <div className={styles.cartItem} key={item.id}>
            <img src={`http://localhost:3333/${item.image}`} alt={item.title} className={styles.itemImage} />
            <div className={styles.itemDetails}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <div className={styles.itemControls}>
                <button onClick={() => dispatch(removeFromCart(item.id))}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))}>+</button>
              </div>
            </div>
            <div className={styles.itemPrice}>
              <strong>${item.discont_price || item.price * item.quantity}</strong>
              {item.discont_price && (
                <span className={styles.oldPrice}>${item.price}</span>
              )}
            </div>
            <button className={styles.removeBtn} onClick={() => dispatch(removeFromCart(item.id))}>×</button>
          </div>
        ))}
      </div>

      <div className={styles.orderDetails}>
        <h2>Order details</h2>
        <p>{totalCount} items</p>
        <h3>Total <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span></h3>

        <form className={styles.orderForm}>
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Phone number" required />
          <input type="email" placeholder="Email" required />
          <button type="submit" className={styles.orderBtn}>Order</button>
        </form>
      </div>
    </div>
  );
};

export default BasketPage

