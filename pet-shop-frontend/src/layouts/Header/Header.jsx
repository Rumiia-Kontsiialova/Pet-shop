import logo from '../../assets/svg/logo.svg'
import basketEmpty from '../../assets/svg/basket-empty.svg'
import { Link } from 'react-router-dom'
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.container}>
        <Link to='/'><img src={logo} alt="logo" /></Link>
        <nav className={styles.nav}>
            <Link to='/' className={styles.link}>Mein Page</Link>
            <Link to='/categories' className={styles.link}>Categories</Link>
            <Link to='/all-products' className={styles.link}>All products</Link>
            <Link to='/sale' className={styles.link}>All sales</Link>
        </nav>
        <Link to='/basket'><img src={basketEmpty} alt="logoBasket" /></Link>
    </div>
  )
}

export default Header