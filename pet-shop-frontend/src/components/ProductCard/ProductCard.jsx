import { Button } from 'antd';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlices';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, minPrice, maxPrice, includeDiscount }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };
    
    const calculateDiscountPercentage = (price, discountPrice) => {
        if (price && discountPrice) {
            const discount = ((price - discountPrice) / price) * 100;
            return Math.round(discount);
        }
        return 0;
    }

    const isValidProduct = () => {
        if (product.price < minPrice || product.price > maxPrice) {
            return false;
        }
        if(includeDiscount && !product.discount_price) {
            return false;
        }
        return true;
    }
    if (!isValidProduct()) return null;

  return (
    <li>
        <div>
            <img src={`http://localhost:3333/${product.image}`} alt={product.title} />
            {product.discount_price && (
                <div>
                    -{calculateDiscountPercentage(product.price, product.discount_price)}%
                </div>
            )}
            <div>
                <Button onClick={handleAddToCart}></Button>
            </div>
        </div>
        <Link to={`/products/${product.id}`}>
            <div>
                <h3>{product.title}</h3>
                <div>
                    {product.discount_price ? (
                        <>
                            <span>${product.discount_price}</span>
                            <span>${product.price}</span>
                        </>
                    ) : (
                        <span>${product.price}</span>
                    )}
                </div>
            </div>
        </Link>
    </li>
  )
}

export default ProductCard