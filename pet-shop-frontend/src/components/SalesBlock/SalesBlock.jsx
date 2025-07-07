import axios from "axios";
import { useEffect, useState } from "react";
import styles from './SalesBlock.module.css';
import { Link } from "react-router-dom";
import { Button } from "antd";

function SalesBlock() {
    const [discountedProducts, setDiscountedProducts] = useState([]);

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3333/products/all');
                const filteredProducts = response.data.filter(product => product.discont_price !== null);
                setDiscountedProducts(filteredProducts.slice(0, 4));
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchDiscountedProducts();
    }, []);

    const DiscountPerc = (price, discountPrice) => {
        if (price && discountPrice) {
            const discount = ((price - discountPrice) / price) * 100;
            return Math.round(discount);
        }
        return 0;
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Sale</h2>
                <div className={styles.titleLine}></div>
                <Link to='/sale'><Button type='default' className={styles.titleBtn}>All sales</Button></Link>
            </div>
           
            <ul className={styles.gridContainer}>
                {discountedProducts.map(product => (
                    <li key={product.id} className={styles.gridItem}>
                        <Link to={`/products/${product.id}`} className={styles.productLink}>
                            <div className={styles.productImageContainer}>
                                <img src={`http://localhost:3333/${product.image}`} alt={product.title} className={styles.productImg} />
                                <div className={styles.discountLabel}>
                                    -{DiscountPerc(product.price, product.discont_price)}%
                                </div>
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                    <div className={styles.priceBox}>
                                        <span className={styles.discontPrice}>${product.discont_price}</span>
                                        <span className={styles.normallPrice}>${product.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SalesBlock