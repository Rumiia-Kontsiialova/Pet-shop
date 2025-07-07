import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './CategoriesPage.module.css'
import { Button } from 'antd'

const CategoriesPage = () => {
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const response = await axios.get("http://localhost:3333/categories/all")
                setCategories(response.data)
            } catch (error) {
                console.error("Error:", error)
            }
        };
        fetchCategories()
    }, [])
  return (
    <div>
      <div className={styles.navigate}>
        <Link to="/">
          <Button>
            Mein Page
          </Button>
        </Link>
        <div className={styles.titleLine}></div>
         <Link to="/categories">
          <Button>
            Categories
          </Button>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
            <h2 className={styles.title}>Categories</h2>
        </div>
        
        <ul className={styles.gridContainer}>
            {categories.slice(0, 8).map((category) => (
                <li key={category.id} className={styles.gridItem}>
                    <Link to={`/categories/${category.id}`} className={styles.categoryName}>
                        <img src={`http://localhost:3333/${category.image}`}
                         alt={category.title}
                        />
                        <h3 className={styles.categoryName}>{category.title}</h3>
                    </Link>
                </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoriesPage