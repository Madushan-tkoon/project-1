import React from 'react'
import Image from 'next/image';
import { TiDelete } from "react-icons/ti";
import { HiMinus, HiPlus } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";

import { useCart } from '../../context/CartContext';

const PopupCart = ({ isOpen, toggleCart }) => {
  const { cartItems, addToCart, removeFromCart, deleteFromCart, getTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 w-full h-full">
      <div className='w-[500px] h-[600px] bg-white rounded-[18px] p-7 pt-14 flex flex-col gap-4 text-black relative'>
        
        <div className="absolute top-1 right-1 cursor-pointer text-[35px]" onClick={toggleCart}>
          <TiDelete />
        </div>

        <div className='flex flex-col gap-4 overflow-y-auto scrollbar-hide relative'>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className='relative flex items-center justify-between h-[95px] w-full border-b border-black/25 py-2.5 sm:h-[110px]'>
                <div className=" flex h-full items-center gap-0 md:gap-2">
                  <div className={`flex items-center justify-center relative w-[80px] h-full m-2 rounded-[20px] sm:w-[100px]`}>
                    <Image src={item.material} alt="cart-item" className="object-cover rounded-[8px]" />
                    <Image 
                      src={item.logo} 
                      alt="cart-item" 
                      width={100} 
                      height={100} 
                      className="object-contain absolute inset-0 m-auto w-20 "
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 max-w-[220px] font-2 text-black items-start text-[12px] sm:text-[14px]">
                    <h2>{item.title}</h2>
                    <p>${item.price}</p>
                    <p>Size: {item.size}</p>
                  </div>
                </div>

                <div className="absolute flex items-center bottom-0.5 right-1 gap-2 mb-2 border-1 rounded-[4px] border-black/30 px-1 scale-80 sm:scale-100 sm:right-2">
                  <HiMinus
                    className={`text-[13px] ${item.quantity === 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer opacity-70"}`}
                    onClick={() => item.quantity > 1 && removeFromCart(item)}
                  />
                  <span className="font-2 text-[15px] mx-1.5">{item.quantity}</span>
                  <HiPlus
                    className="text-[13px] cursor-pointer opacity-70"
                    onClick={() => addToCart(item)}
                  />
                </div>

                <div
                  className='absolute top-1 right-1 text-[27px] text-black/40 cursor-pointer'
                  onClick={() => deleteFromCart(item)}
                >
                  <MdDeleteForever />
                </div>
              </div>
            ))
          )}
        </div>

        <div className='flex flex-col gap-6 mt-auto'>
          <h3 className='flex justify-between text-lg font-semibold'>
            <span>Total:</span>
            <span>${getTotal().toFixed(2)}</span>
          </h3>
          <button className='w-full bg-black text-white py-2 rounded-lg cursor-pointer'>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default PopupCart



