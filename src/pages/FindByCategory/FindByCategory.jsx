import { useContext, useEffect, useState } from 'react'
import { GetAllCategories, GetProductsByCategory } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faBars, faHome } from '@fortawesome/free-solid-svg-icons'
import './FindByCategory.css'
import Basket from '../../components/basket/Basket'
import { Context } from '../../App'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import '../../components/footer/Footer.css'
export default function FindByCategory() {
    const [products,setProducts] = useState([])
    const [filteredProduct,setFilteredProduct] = useState([])
    const [categoriesForPage,setCategoriesForPage] = useState([])
    const [loading,setLoading] = useState(true)
    const [menu,openMenu] = useState(false)
    const navigate = useNavigate()
    const {_id} = useParams()
    const [skip, setSkip] = useState(0);
    const {add,showBasket} = useContext(Context)
    const [changePageStart,setChangePageStart] = useState(false)
    const [changePageEnd,setChangePageEnd] = useState(true)
    useEffect(() => {
        if(skip == 0) {
            setChangePageStart(false)
        } else {
            setChangePageStart(true)
        }
    },[skip])
    useEffect(() => {
        if(skip == 1) {
            setChangePageEnd(false)
        } else {
            setChangePageEnd(true)
        }
    },[skip])

    useEffect(() => {
        GetProductsByCategory(_id,skip,5).then(data => {
            setProducts(data)
            setLoading(false)
        })
    },[skip])
    useEffect(() => {
        GetAllCategories().then(data => {
            setCategoriesForPage(data)
        })
    },[])
    const search = (value) => {
        const filtered = products.products.filter(el => el.title.toLowerCase().trim().includes(value.toLowerCase().trim()))
        setFilteredProduct(filtered)
    }
  return (
    <>
        {loading && <Loading/>}
        {!loading &&
        <>
        <Header/>
        {showBasket && <Basket/>}
        <div className='flex'>
            <div className={menu ? 'active w-[260px]  fixed h-[100vh] flex items-center flex-col ' 
            : 'leftBlok w-[260px] fixed h-[100vh] flex items-center flex-col'}>
                <div className=' mt-2'>
                    <button onClick={() => navigate('/')} ><FontAwesomeIcon icon={faHome}/> Home</button>
                    <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAngleLeft} fade className='ml-1 mr-1'/>Back</button>
                </div>
                <div>
                <p className=' font-bold text-center text-[16px] mt-4 mb-4'>Search By Model</p>
                <input type="text" placeholder='Search!' className=' text-black border rounded-[40px] h-[37px] w-[200px] p-2 outline-none'
                onChange={(e) => search(e.target.value)} />
                <div className='inline ml-2'>{filteredProduct.length == products.products.length || filteredProduct.length == 0 ? '' : filteredProduct.length}</div>
                </div>
                <div className=' text-center'>
                    <p className=' font-bold text-[16px] mt-4 mb-4'>All Categories</p>
                    {
                        categoriesForPage.map(el => <div key={el._id}>
                            <a href={'/category/' + el._id}>{el.name}</a>
                        </div>)
                    }
                </div>
            </div>
            <div className='blok w-[320px]'></div>
            <div className='menuBtn bg-[#F5F7FF] p-2 fixed w-full flex justify-center items-center'>
                <div className='menuBar' onClick={() => openMenu(!menu)}>
                    <FontAwesomeIcon icon={faBars} className={menu ? 'border-b-4 border-gray-300 h-[30px]' : 'h-[30px]'}/>
                </div>
                <div>
                    <img src="/iconweb.png" alt="" className='h-[40px]' />
                </div>
            </div>
            <div className=' w-full'>
                <div className='products w-full grid sm:grid-cols-2 lg:grid-cols-4 '>
                    {
                        filteredProduct.length && 
                        filteredProduct.map(el => <div><div key={el._id} 
                        className=' flex justify-center items-center flex-col m-2 p-4 cursor-pointer duration-300 hover:shadow-lg'
                        onClick={() => {
                            localStorage.setItem('productID',el._id)
                            navigate('/electronic/' + el._id)}}>   
                            <img src={el.photos[0].url} alt="" className='h-[230px] w-[230px]'/>
                            <div className='titleCateg font-semibold'>{el.title}</div>
                            <div>{el.price} ֏</div>
                        </div>
                        <div className=' w-full flex justify-center' >
                        <button className=' px-2 py-2  bg-[#0156FF] rounded-[10px] hover:bg-slate-300 border-2 duration-300  w-[120px]' onClick={() => add(el)}>Ավելացնել զամբյուղ</button>
                        </div>
                        </div>
                        ) 
                        ||
                        products?.products.map(el => <div><div key={el._id} 
                        className=' flex justify-center items-center flex-col m-2 p-4 cursor-pointer duration-300 hover:shadow-lg'
                        onClick={() => {
                            localStorage.setItem('productID',el._id)
                            navigate('/electronic/' + el._id)}}>   
                            <img src={el.photos[0].url} alt="" className='h-[230px] w-[230px]'/>
                            <div className='titleCateg font-semibold'>{el.title}</div>
                            <div>{el.price} ֏</div>
                        </div>
                            <div className=' w-full flex justify-center' >
                                    <button className=' px-2 py-2  bg-[#0156FF] rounded-[10px] hover:bg-slate-300 border-2 duration-300 w-[120px]' onClick={() => add(el)}>Ավելացնել զամբյուղ</button>
                            </div>
                        </div>)
                    }
                </div>
                {products.products.length > 0 ?
                <div className=' flex mt-20 mb-10 justify-center w-full text-black '>
                    {changePageStart ? <button onClick={()=>setSkip(0)} className=' rounded-full bg-slate-200 h-[40px] w-[40px] '><FontAwesomeIcon icon={faAngleLeft}/></button>
                     : <button title='Առաջին էջ' className=' cursor-default rounded-full opacity-60 bg-slate-200 h-[40px] w-[40px] '><FontAwesomeIcon icon={faAngleLeft}/></button>}
                    <button onClick={()=>setSkip(0<skip-1?skip-1:skip)} className=' rounded-full bg-slate-200 h-[40px] w-[40px] ml-2 mr-2'>{0<skip-1?skip-1:skip}</button>
                    <button onClick={()=>setSkip((products?.totalPages)>skip+1?skip+1:skip)} className=' rounded-full bg-slate-200 h-[40px] w-[40px]'>{(products?.totalPages)>skip+1?skip+1:skip}</button>
                    {changePageEnd ? <button onClick={()=>setSkip(products?.totalPages -1)} className=' rounded-full bg-slate-200 h-[40px] w-[40px] ml-2'><FontAwesomeIcon icon={faAngleRight}/></button>
                 : <button title='Վերջին էջ' className=' cursor-default rounded-full opacity-60 bg-slate-200 h-[40px] w-[40px] ml-2'><FontAwesomeIcon icon={faAngleRight}/></button>
                }
                    </div> : <p className='m-8 text-2xl font-semibold'>Ոչ մի ապրանք</p>}
                <div className={products.products.length == 0 && ' flex items-end h-[100vh]'}>
                    <Footer/>
                </div>
            </div>
        </div>
        </>
        }
    </>
  )
}
