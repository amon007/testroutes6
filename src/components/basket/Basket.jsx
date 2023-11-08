import { useContext } from 'react'
import './Basket.css'
import { FaTrash } from 'react-icons/fa'
import { Context } from '../../App'


export default function Basket() {
    const {addToBasket, showBasket, remove, plus, minus} = useContext(Context)

    return (
        <>
                {addToBasket.length == 0 && showBasket ? <p className=' fixed mt-4 right-8 z-[1000]'>Զամբյուղը դատարկ է</p> :
                <div className=' bg-[#001D3D] mt-4 p-4 fixed right-8 z-[1000] rounded-[10px]' >
                    {
                    addToBasket.map(el => <div key={el._id} className=' text-xl text-white'>
                            <div className=' flex justify-between items-center mt-2 '>
                                <div className='flex items-center'>
                                    <img src={el.photos[0].url} className=' mr-2 h-[60px] w-[60px]' alt="" />
                                    <span className='basketText mr-4'>{el.title}</span>
                                </div>
                                <div className='flex'>
                                    <div className='basketText'>{el.price * el.quantity + ' ֏'}</div>
                                    <button className=' pl-2 pr-2' onClick={() => minus(el._id)}>-</button>
                                    <span className='basketText'>{el.quantity}</span>
                                    <button className=' pl-2 pr-2' onClick={() => plus(el._id)}>+</button>
                                    <button className=' pl-2 pr-2' onClick={() => remove(el)}><FaTrash/></button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>}
        </>
    )
}
