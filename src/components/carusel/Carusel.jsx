import React from 'react'
import './Carusel.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function Carusel() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      return (
        <div className=' flex justify-center' >
            <div className="slider 2xl:h-[500px] 2xl:w-[1500px] overflow-hidden"  >
                  <Carousel responsive={responsive} autoPlay={true} infinite={true}>
                      <div className='slider 2xl:h-[500px] 2xl:w-[1500px]'>
                        <div className='slider h-full w-full' style={{background: `url('/iphone.jpg')`,
                            backgroundPosition:'center',backgroundSize:'cover',backgroundRepeat:'no-repeat'}}></div>
                      </div>
                      <div className='slider 2xl:h-[500px] 2xl:w-[1500px]'>
                        <div className='slider h-full w-full' style={{background: `url('/electronics.jpg')`,
                          backgroundSize:'cover',backgroundPosition:'center'}}></div>
                      </div>
                      <div className='slider 2xl:h-[500px] 2xl:w-[1500px]'>
                        <div className='slider h-full w-full' style={{background: `url('/tvhd2.jpg')`,
                        backgroundPosition:'center',backgroundSize:'cover'}}></div>
                      </div>
                  </Carousel>
            </div>
        </div>
      );
}
