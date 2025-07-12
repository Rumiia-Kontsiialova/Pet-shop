import logo from '../../assets/svg/logo.svg'
import basketEmpty from '../../assets/svg/basket-empty.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
import styles from './header.module.css'

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.container}>
        <Link to='/'><img src={logo} alt="logo" /></Link>
        <nav className={styles.nav}>
            <Link to='/' className={styles.link}>Mein Page</Link>
            <Link to='/categories' className={styles.link}>Categories</Link>
            <Link to='/all-products' className={styles.link}>All products</Link>
            <Link to='/sale' className={styles.link}>All sales</Link>
        </nav>
        <Link to='/basket'>
          <Badge count={totalCount} size="small" offset={[-5, 5]} style={{background: '#0D50FF'}}>
           <img src={basketEmpty} alt="logoBasket" />
          </Badge>
        </Link>
    </div>
  )
}

export default Header