import React from 'react'
import NotFoundImg from '../../assets/png/404.png'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img src={NotFoundImg} alt="NotFoundImg" />
      <h2 className={styles.title}>Page Not Found</h2>
      <p>We’re sorry, the page you requested could not be found. <br />Please go back to the homepage.</p>
      <Link to='/'><Button type='primary' style={{ fontSize: '20px', fontWeight: 500, padding: '30px 50px' }}>Go Home</Button></Link>
    </div>
  )
}

export default NotFoundPage