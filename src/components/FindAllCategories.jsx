import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../pages/home/Home';
export default function FindAllCategories() {
    const {categories} = useContext(CategoriesContext)
    const navigate = useNavigate()
    const [showAll,setShowAll] = useState(false)
    const [filteredCategories,setFilteredCategories] = useState([])
    useEffect(() => {
      const filter = categories.slice(0,4)
      setFilteredCategories(filter)
    },[])
    

  return (
    <>
    <div className=' duration-150 container mx-auto'>
        <h1 className=' font-semibold text-[26px] mt-4 text-center'>Ըստ կատեգորիայի</h1>
        <div className=' grid sm:grid-cols-2 lg:grid-cols-4 border-t-2'>
            {
              showAll ? 
               categories.map(el => <div key={el._id}
                className='flex justify-center items-center flex-col m-4 p-4 cursor-pointer duration-300 hover:shadow-lg'
                onClick={() => navigate('/category/' + el._id)} >
                    <img src={el.photo} alt="" 
                    className=' h-[250px] w-[300px]'/>
                    <div className='mt-2 font-semibold'>{el.name}</div>
                </div>) : filteredCategories.map(el => <div key={el._id}
                className=' flex justify-center items-center flex-col m-4 p-4 cursor-pointer duration-300 hover:shadow-lg'
                onClick={() => navigate('/category/' + el._id)} >
                    <img src={el.photo} alt="" 
                    className=' h-[250px] w-[300px]'/>
                    <div className='mt-2 font-semibold'>{el.name}</div>
                </div>)

            }
        </div>
        <div className=' flex items-center justify-center mt-8 mb-8'>
            <div className=' border-b-2  w-full mr-2'></div>
            <button className=' bg-slate-200 text-[14px] font-semibold text-black py-4 w-full max-w-[160px] rounded-[30px] hover:opacity-70'
            onClick={() => setShowAll(!showAll)}>{showAll ? 'Թաքցնել' : 'Ցույց տալ ամբողջը'}
            </button>
            <div className=' border-b-2  w-full ml-2'></div>
        </div>
      </div>
    </>
  )
}
