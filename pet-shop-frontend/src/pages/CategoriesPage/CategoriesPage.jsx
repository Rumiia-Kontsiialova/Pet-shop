import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom'
import styles from './CategoriesPage.module.css'


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
        <NavLink to="/"
          className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
        >
          Mein Page
        </NavLink>
        <div className={styles.titleLine}></div>
         <NavLink to="/categories"
          className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
         >
          Categories
        </NavLink>
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