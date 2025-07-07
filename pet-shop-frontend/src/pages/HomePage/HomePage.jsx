import React from 'react'
import PromoHome from '../../components/PromoHome/PromoHome'
import CategoriesBlock from '../../components/CategoriesBlock/CategoriesBlock'
import DiscountForm from '../../components/DiscountForm/DiscountForm'
import SalesBlock from '../../components/SalesBlock/SalesBlock'

const HomePage = () => {
  return (
    <div>
      <PromoHome />
      <CategoriesBlock />
      <DiscountForm />
      <SalesBlock />
    </div>
  )
}

export default HomePage