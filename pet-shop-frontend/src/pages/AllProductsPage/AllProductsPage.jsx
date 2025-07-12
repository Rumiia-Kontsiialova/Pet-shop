import axios from "axios";
import { useEffect, useState } from "react";
import styles from './AllProductsPage.module.css';
import { Link, NavLink } from "react-router-dom";
import { Button } from "antd";
import classNames from "classnames";

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/basketSlice'

function AllProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [onlyDiscount, setOnlyDiscount] = useState(false);
    const [sortOrder, setSortOrder] = useState('default');

    const dispatch = useDispatch();
    const cartItemIds = useSelector((state) => state.cart.items.map((item) => item.id));

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3333/products/all');
                setAllProducts(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchAllProducts();
    }, []);

    const DiscountPerc = (price, discountPrice) => {
        if (price && discountPrice) {
            const discount = ((price - discountPrice) / price) * 100;
            return Math.round(discount);
        }
        return 0;
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const filteredAndSortedProducts = allProducts
        .filter(product => {
            const price = product.discont_price || product.price;
            if (onlyDiscount && !product.discont_price) return false;
            if (minPrice && price < Number(minPrice)) return false;
            if (maxPrice && price > Number(maxPrice)) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortOrder === 'highToLow') {
                return (b.discont_price || b.price) - (a.discont_price || a.price);
            } else if (sortOrder === 'lowToHigh') {
                return (a.discont_price || a.price) - (b.discont_price || b.price);
            }
            return 0;
        });

    return (
        <div className={styles.container}>
            <div className={styles.navigate}>
                <NavLink to="/"
                    className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
                >
                    Mein Page
                </NavLink>
                <div className={styles.titleLine}></div>
                <NavLink to="/all-products"
                    className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
                >
                    All products
                </NavLink>
            </div>

            <div className={styles.filterContainer}>
                <div className={styles.priceInputs}>
                    Price
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                <label className={styles.checkboxLabel}>
                    Discounted items
                    <input
                        type="checkbox"
                        checked={onlyDiscount}
                        onChange={() => setOnlyDiscount(!onlyDiscount)}
                    />
                </label>

                <p>Sorted</p>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={styles.selectSort}
                >
                    <option value="default">Default</option>
                    <option value="newest">Newest</option>
                    <option value="highToLow">Price: high → low</option>
                    <option value="lowToHigh">Price: low → high</option>
                </select>
            </div>

            <div className={styles.titleContainer}>
                <h2 className={styles.title}>All products</h2>
            </div>

            <ul className={styles.gridContainer}>
                {filteredAndSortedProducts.slice(0, 12).map(product => {
                    const isInCart = cartItemIds.includes(product.id);
                    return (
                        <li key={product.id} className={styles.gridItem}>
                            <div className={styles.cardWrapper}>
                                <Link to={`/products/${product.id}`} className={styles.productLink}>
                                    <div className={styles.productImageContainer}>
                                        <img src={`http://localhost:3333/${product.image}`} alt={product.title} className={styles.productImg} />
                                        {product.discont_price && (
                                            <div className={styles.discountLabel}>
                                                -{DiscountPerc(product.price, product.discont_price)}%
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <Button
                                    className={classNames(styles.cartButton, {
                                        [styles.cartButtonActive]: isInCart
                                    })}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {isInCart ? 'Added' : 'Add to cart'}
                                </Button>
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                    <div className={styles.priceBox}>
                                        <span className={styles.discontPrice}>${product.discont_price || product.price}</span>
                                        {product.discont_price && (
                                            <span className={styles.normallPrice}>${product.price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default AllProductsPage;
