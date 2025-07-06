import { Link } from 'react-router-dom'
import styles from './PromoHome.module.css'
import { Button } from 'antd'

const PromoHome = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Amazing Discounts <br /> on Pets Products!</h1>
        <Link to='/discounted-products'><Button type='primary' className={styles.btn}>Check out</Button></Link>
    </div>
  )
}

export default PromoHome