import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaCartShopping } from 'react-icons/fa6'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

const CartMobileLink = () => {
    const { totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)

    const containerVariants = {
      hidden: { opacity: 0, y: 100, scale: 0.8 },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.5,
          ease: "easeOut"
        }
      },
      exit: { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        transition: { duration: 0.3 }
      }
    }

    const buttonVariants = {
      hover: {
        scale: 1.05,
        transition: { duration: 0.2 }
      },
      tap: {
        scale: 0.95,
        transition: { duration: 0.1 }
      }
    }

    const iconVariants = {
      hover: {
        rotate: 5,
        transition: { duration: 0.2 }
      }
    }

  return (
    <AnimatePresence mode="wait">
        {
            cartItem[0] && (
            <motion.div 
              className='sticky bottom-4 p-2 z-40'
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div 
                className='bg-slate-800 px-4 py-3 rounded-lg text-white text-sm flex items-center justify-between gap-3 lg:hidden shadow-xl'
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className='flex items-center gap-3'>
                  <motion.div 
                    className='p-2 bg-slate-700 rounded-lg w-fit'
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <FaCartShopping size={20}/>
                  </motion.div>
                  <div className='text-xs'>
                    <p className='font-medium text-gray-200'>{totalQty} items</p>
                    <p className='font-bold text-sm'>{DisplayPriceInRupees(totalPrice)}</p>
                  </div>
                </div>

                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Link to={"/cart"} className='flex items-center gap-1 hover:bg-slate-700 px-3 py-1 rounded transition-colors'>
                    <span className='text-sm font-medium'>View Cart</span>
                    <FaCaretRight/>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default CartMobileLink
