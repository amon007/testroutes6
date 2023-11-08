import { useEffect, useState } from 'react'
import { AllProducts } from '../api'
import { useNavigate } from 'react-router-dom'

export default function GetAllProducts({add}) {
    const [allProducts,setAllProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        AllProducts().then(data => {
            console.log(data);
            setAllProducts(data.posts)
        })
    },[])
  return (
    <>
        <div className=' container mx-auto mb-20'>
            <h1 className=' text-center font-semibold text-[26px]'>Լավագույն ապրանքներ</h1>
            <div className=' grid sm:grid-cols-2 lg:grid-cols-4'>
                {
                    allProducts.map(el => <div><div key={el._id}       
                    className=' flex justify-center items-center flex-col m-2 p-4 cursor-pointer duration-300 hover:shadow-lg'
                    onClick={() => {
                        localStorage.setItem('productID',el._id)
                        navigate('/electronic/' + el._id) }}>
                            <img src={el.photos[0]?.url} alt="" className='h-[230px] w-[230px]'/>
                            <div className='font-semibold'>{el.title}</div>
                            <div>{el.price} ֏</div>
                            </div>
                            <div className=' w-full flex justify-center' >
                            <button className=' px-2 py-2  bg-[#0156FF] rounded-[10px] hover:bg-slate-300 border-2 duration-300 z-50 w-[120px]' onClick={() => add(el)}>Ավելացնել զամբյուղ</button>
                            </div>
                    </div>)
                }
            </div>
        </div>
    </>
  )
}
