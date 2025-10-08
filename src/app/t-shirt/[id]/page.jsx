"use client"

import DitailsTshirtModel from '../../../components/3Dmodel/DitailsTshirtModel';
import Footer from '../../../components/common/Footer';
import Header from '../../../components/common/Header';
import { useParams } from 'next/navigation';
import { PiShareFatFill } from "react-icons/pi";
import {useCart} from '../../../context/CartContext'
import productData from '../../../data/productData';
import { useEffect, useState } from 'react';


const ProductDetailsPage = () => {    

  const { id } = useParams();
  const {addToCart} = useCart();

  const productId = id ? parseInt(id.toString()) : null;
  const product = productData.find(item => item.id === productId);

  const {title, price, logo, material} = product

  const availableSizes = ['S', 'M', 'L', 'XL']

  const [selectedSize, setSelectedSize] = useState("M")
 
  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current text-black" viewBox="0 0 24 24">
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  );

  const [hight, setHight] = useState(350);

  useEffect(()=>{
    if (screen.height<700){
      setHight(280);
    }else{
      setHight(350);
    }
  },[screen.height])


  return (
    <div className='h-dvh bg-[#fff]' >
      <Header color="black"/>
      <div className='mx-auto relative max-w-6xl gap-6 flex flex-col md:flex-row pt-20 sm:pt-30 justify-between h-full items-center px-6 py-4 sm:py-7'>
        <div className='flex h-full items-center justify-center'>
          <div className={`w-[350px] h-[${hight}px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] relative`}>
            <DitailsTshirtModel logo={logo} material={material}/>
          </div>
        </div>

        <div className='flex flex-col gap-1 sm:gap-6 w-full md:w-[350px] lg:w-[430px]'>
            <div className='flex flex-col gap-1.5'>
              <p className="text-[13px] sm:text-sm uppercase font-semibold text-gray-500 tracking-wider">Super Soft</p>
              <h1 className="text-[26px] sm:text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
              <div className="flex items-center gap-2 mb-1 scale-85 sm:scale-100 ml-[-28px] sm:ml-0">
                <div className="flex gap-1">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span className="text-sm text-gray-500">323 Reviews</span>
              </div>
            </div>
            <span className="text-[20px] sm:text-[30px]  font-bold text-gray-800">${price}</span>
            
            <div className='flex flex-col gap-2'>
                {/* <label>Size: {selectedSize} </label> */}
                <div className='flex gap-3 text-[12px] sm:text-[15px] mt-2.5 '>
                  {availableSizes.map((size, index)=>(
                    <button 
                      key={index}
                      onClick={()=> setSelectedSize(size)}
                      className={`w-[27px] h-[24px] sm:w-[35px] sm:h-[30px]  flex items-center justify-center rounded-[4px] cursor-pointer font-2 ${ selectedSize === size ? 'bg-black text-white' : 'bg-white text-black border border-gray-400' }`}
                    >{size}</button>
                  ))}
                </div>                
            </div>
            <div className='flex w-full justify-between gap-5 mt-7'>
                <button 
                  onClick={()=>{
                    const selectedProduct = {...product, size: selectedSize}
                    addToCart(selectedProduct)
                  }} 
                  className='bg-black text-white w-full text-[14px] font-2 py-0 sm:py-2.5 rounded-2xl cursor-pointer'>Add To Cart</button>
                <button className='bg-black text-white w-[60px] text-[20px] font-3 py-2.5 rounded-2xl flex items-center justify-center cursor-pointer'><PiShareFatFill/></button>
            </div>
            
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default ProductDetailsPage