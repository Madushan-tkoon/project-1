import Image from 'next/image'
import Logo1 from "../../../public/images/logoWhite.png" 
import Logo2 from "../../../public/images/logoBlack.png" 
import { BsPersonFill } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import Button from '../common/Button'
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import PopupCart from '../common/PopupCart';

const Header = ({color}) => {

  const logoSrc = color === "black" ? Logo2 : Logo1;
  const buttonColor1 = color === "black" ? "black&white" : "black";
  const buttonColor2 = color === "black" ? "TBlack" : "white";

  const { getTotalQuantity } = useCart();
  const countItems = getTotalQuantity();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className='absolute z-20 left-0 right-0 top-0 '>
        <div className='flex items-center justify-between max-w-[1230px] w-full mx-auto py-4 md:py-8 px-4 md:px-6'>
          <Link href="/" className='w-20 md:w-36 ml-2.5'>
            <Image src={logoSrc} alt="Logo" className='ml-[-5px]' />
          </Link>
          <div className='flex gap-1 md:gap-5 '>
            <Button color={buttonColor2} onClick={toggleCart}>
               <div className='h-4 flex items-center justify-center absolute bg-black mt-[-20px] ml-[20px] rounded-2xl'>
                 <span className='text-white text-[9px] px-1.5'>{countItems}</span>
               </div>
               <IoBagHandleOutline className='text-[23px] md:text-[26px] ' />
            </Button>

            {/* PopupCart */}
            <PopupCart isOpen={isCartOpen} toggleCart={toggleCart} />

            <div className='block md:hidden'>
              <Button color={buttonColor2}>
                <BsPersonFill className='text-[23px]' />
              </Button>
            </div>
            <div className='hidden md:block'>
              <Button color={buttonColor1}>
                Sign In
              </Button> 
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header