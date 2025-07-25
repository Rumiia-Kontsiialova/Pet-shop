import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage"
import ProductFromTheCategoryPage from "./pages/ProductFromTheCategoryPage/ProductFromTheCategoryPage"
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage"
import DiscountedProductsPage from "./pages/DiscountedProductsPage/DiscountedProductsPage"
import ProductPage from "./pages/ProductPage/ProductPage"
import BasketPage from "./pages/BasketPage/BasketPage"
import Header from "./layouts/Header/Header"
import './App.css'
import Footer from "./layouts/Footer/Footer"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"


function App() {
  
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/categories" element={<CategoriesPage />}/>
          <Route path="categories/:categoryId" element={<ProductFromTheCategoryPage />}/>
          <Route path="all-products" element={<AllProductsPage />}/>
          <Route path="sale" element={<DiscountedProductsPage />}/>
          <Route path="products/:productId" element={<ProductPage />}/>
          <Route path="/basket" element={<BasketPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        <Footer />
      </div>
  )
}

export default App
