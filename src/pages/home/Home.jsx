import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/loading/Loading'
import './Home.css'
import Header from '../../components/header/Header'
import { GetAllCategories } from '../../api'
import FindAllCategories from '../../components/FindAllCategories'
import GetAllProducts from '../../components/GetAllProducts'
import Carousel from '../../components/carusel/Carusel'
import Basket from '../../components/basket/Basket'
import { Context } from '../../App'
import Footer from '../../components/footer/Footer'


export const CategoriesContext = React.createContext()


export default function Home() {
  const [categories,setCategories] = useState([])
  const categoriesValue = {
    categories:categories
  }
  const [loading,setLoading] = useState(true)
  const {add,showBasket} = useContext(Context)
  useEffect(() => {
    GetAllCategories().then(data => {
      setCategories(data)
      setLoading(false)
    })
  },[])


  return (
    <>
      {loading && <Loading/>}
      {!loading && 
      <CategoriesContext.Provider value={categoriesValue}>
        <div>
        <Header/>
        {showBasket && <Basket/>}
        <Carousel/>
        <FindAllCategories />
        <GetAllProducts add={add} />
        <Footer/>
      </div>
      </CategoriesContext.Provider>
      }
    </>
  )
}

