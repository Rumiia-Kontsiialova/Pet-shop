import { Link } from "react-router-dom"
import instagram from '../../assets/svg/instagram.svg'
import whatsapp from '../../assets/svg/whatsapp.svg'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>
        <div className={styles.footerAbout}>
            <div className={styles.tel}>
                <p>Phone</p>
                <a href="+49 30 915-88492">+49 30 915-88492</a>
            </div>      
            <div className={styles.socials}>
                <p>Socials</p>
                <Link to='/https://www.instagram.com/'><img src={instagram} alt="instagram" /></Link>
                <Link to='/https://www.whatsapp.com/'><img src={whatsapp} alt="whatsapp" /></Link>
            </div>
            <div className={styles.address}>
                <p>Address</p>
                <address>Wallstraße 9-13, 10179 Berlin <br /> Deutschland</address>
            </div>
            <div className={styles.hours}>
                <p>Working Hours</p>
                <p>24 hours a day</p>
            </div>
        </div>
    </div>
    
  )
}

export default Footer