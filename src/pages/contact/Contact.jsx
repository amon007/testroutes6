import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Basket from '../../components/basket/Basket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAt, faClock, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import emailjs from '@emailjs/browser';

import validator from 'validator';
import { Context } from '../../App'

export default function Contact() {

  const {showBasket} = useContext(Context)
  const navigate = useNavigate()


  // =============================== CHECK USER EMAIL ==============================
  const [emailCorrect,setEmailCorrect] = useState(false)
  const [email,setEmail] = useState('')
  useEffect(() => {
    if(validator.isEmail(email)) setEmailCorrect(true)
    else setEmailCorrect(false)
  },[email])


  // ================================ CHECK USER PHONE ======================================

  const [phoneNumber,setPhoneNumber] = useState('')
  const [phoneCorrect,setPhoneCorrect] = useState(false)
  useEffect(() => {
    if( +phoneNumber - +phoneNumber == 0 || phoneNumber == '+') setPhoneCorrect(true)
    else setPhoneCorrect(false) 
  },[phoneNumber])

  //  ========================== SEND MESSAGE EMAIL ============================================
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault();
    if(emailCorrect && phoneCorrect) {
      emailjs.sendForm('service_uyh6ra4', 'template_0vh8oea', form.current, '6Q_XrxKfcRkXA0okJ')
      .then((result) => {
          console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    } 
  };

  
  return (

    <>
    <div className=''>
      <Header/>
      {showBasket && <Basket/>}
      <div className='container w-full mx-auto'>
          <div className=' mt-8 flex ml-4'>
            <button onClick={() => navigate('/')} className=' font-semibold' > Գլխավոր էջ</button>
            <div><FontAwesomeIcon icon={faAngleRight} className='ml-1 mr-1 h-[12px]'/>Կոնտակտային էջ</div>
          </div>
          <div className=' m-8 text-[12px] sm:text-[14px] lg:text-[20px]'>
            <h1>Մենք սիրում ենք լսել ձեզնից՝ մեր Խանութի մասին կարծիքներ: <br />
              Խնդրում ենք կապնվել մեզ հետ, և մենք հնարավորինս շուտ կպատասխանենք ձեզ:
            </h1>
          </div>
          <div className=' flex justify-center'>
            <div className='mt-2 mb-2 bg-slate-200 w-[600px] text-black'>
                    <div className=' m-2'>
                      <FontAwesomeIcon icon={faLocationDot} className='mr-1'/>
                      <span className=' font-semibold'>Հասցե:</span>
                      <p>Երևան 123 321</p>
                    </div>
                    <div className=' m-2'>
                      <FontAwesomeIcon icon={faPhone} className='mr-1'/>
                      <span className=' font-semibold'>Հեռախոսահամար:</span>
                      <p>1233456789</p>
                    </div>
                    <div className=' m-2'>
                      <FontAwesomeIcon icon={faClock} className=' mr-1'/>
                      <span className=' font-semibold'>Մենք աշխատում ենք:</span>
                      <div className=''>
                        <p>Երկուշաբթիից հինգշաբթի՝ 9:00-17:30</p>
                        <p>Ուրբաթ 9:00 - 18:00</p>
                        <p>Շաբաթ՝ 11:00-17:00</p>
                      </div>
                    </div>
                    <div className=' m-2'>
                      <FontAwesomeIcon icon={faAt} className=' mr-1'/>
                      <span className=' font-semibold'>E-mail:</span>
                      <p className=''>test_123@gmail.com</p>
                    </div>
              </div>
          </div>
          <div className=' flex justify-center mt-10'>
              <form action="" ref={form} onSubmit={sendEmail}>
                <div className=' sm:flex lg:flex '>
                  <div className=' m-2'>
                    <p className=' mb-1'>Անուն<span className=' text-red-500'>*</span></p>
                    <input type="text" required={true} name='user_name' className='border p-2 w-[300px] outline-none focus:bg-slate-200 text-black duration-200' />
                  </div>
                  <div className=' m-2'>
                    <p className=' mb-1'>էլեկտրոնային հասցե<span className=' text-red-500'>*</span></p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required={true} name='user_email' className={email.length == 0 || emailCorrect ? 'border p-2 w-[300px] focus:bg-slate-200 outline-none text-black duration-200' 
                    : 'border-2 border-red-600 p-2 w-[300px] focus:bg-slate-200 outline-none text-black' } />
                  </div>
                </div>
                <div className=' m-2'>
                  <p className=' mb-1'>Հեռախոսահամար<span className=' text-red-500'>*</span></p>
                  <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} required={true} name='user_phone' className={phoneNumber.length == 0 || phoneCorrect ? ' border p-2 w-[300px] focus:bg-slate-200 outline-none text-black duration-200 ' 
                  : 'border-2 border-red-600 p-2 w-[300px] focus:bg-slate-200 outline-none text-black'} />
                </div>
                <div className=' m-2'>
                  <p className=' mb-1'>ինչով կարող ենք օգնել ձեզ<span className=' text-red-500'>*</span></p>
                  <textarea rows={4} required={true} name='message' className='border p-2  w-full text-black focus:bg-slate-200 duration-200 outline-none'></textarea>
                </div>
                <div className=' m-2'>
                  <button
                          type="submit"
                          className=" text-white font-bold mt-2 text-[14px] px-6 py-4 rounded-[40px] bg-[#0156FF]"
                        >
                          Ներկայացնել
                  </button>
                </div>
              </form>
          </div>
      </div>
      <div className=' h-[100px]'></div>
      <Footer/>
    </div>
    </>
  )
}
