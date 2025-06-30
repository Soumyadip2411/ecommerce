import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please Login")
    }

    const containerVariants = {
        hidden: { x: "100%" },
        visible: { 
            x: 0,
            transition: { 
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: { 
            x: "100%",
            transition: { duration: 0.3 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.3 }
        }
    }

    const buttonVariants = {
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        }
    }

  return (
    <AnimatePresence mode="wait">
        <motion.section 
            className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div 
                    className='flex items-center p-4 shadow-md gap-3 justify-between'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className='font-semibold text-lg'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <IoClose size={25}/>
                        </motion.div>
                    </Link>
                    <motion.button 
                        onClick={close} 
                        className='hidden lg:block hover:text-red-500 transition-colors'
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <IoClose size={25}/>
                    </motion.button>
                </motion.div>

                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-gray-50 p-2 flex flex-col gap-4'>
                    {/***display items */}
                    <AnimatePresence mode="wait">
                        {
                            cartItem[0] ? (
                                <>
                                    <motion.div 
                                        className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-700 rounded-full'
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.3 }}
                                    >
                                        <p>Your total savings</p>
                                        <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
                                    </motion.div>
                                    <motion.div 
                                        className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.4 }}
                                    >
                                        {
                                            cartItem[0] && (
                                                cartItem.map((item,index)=>{
                                                    return(
                                                        <motion.div 
                                                            key={item?._id+"cartItemDisplay"} 
                                                            className='flex w-full gap-4'
                                                            variants={itemVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            transition={{ delay: 0.5 + index * 0.1 }}
                                                        >
                                                            <div className='w-16 h-16 min-h-16 min-w-16 bg-gray-200 border rounded-lg overflow-hidden'>
                                                                <img
                                                                    src={item?.productId?.image[0]}
                                                                    className='object-scale-down w-full h-full'
                                                                />
                                                            </div>
                                                            <div className='w-full max-w-sm text-xs'>
                                                                <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                                <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                                <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                                                            </div>
                                                            <div>
                                                                <AddToCartButton data={item?.productId}/>
                                                            </div>
                                                        </motion.div>
                                                    )
                                                })
                                            )
                                        }
                                    </motion.div>
                                    <motion.div 
                                        className='bg-white p-4 rounded-lg'
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.6 }}
                                    >
                                        <h3 className='font-semibold mb-3'>Bill details</h3>
                                        <div className='flex gap-4 justify-between ml-1 mb-2'>
                                            <p>Items total</p>
                                            <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                                        </div>
                                        <div className='flex gap-4 justify-between ml-1 mb-2'>
                                            <p>Quantity total</p>
                                            <p className='flex items-center gap-2'>{totalQty} item</p>
                                        </div>
                                        <div className='flex gap-4 justify-between ml-1 mb-3'>
                                            <p>Delivery Charge</p>
                                            <p className='flex items-center gap-2 text-blue-600 font-medium'>Free</p>
                                        </div>
                                        <div className='font-semibold flex items-center justify-between gap-4 pt-2 border-t'>
                                            <p>Grand total</p>
                                            <p className='text-lg'>{DisplayPriceInRupees(totalPrice)}</p>
                                        </div>
                                    </motion.div>
                                </>
                            ) : (
                                <motion.div 
                                    className='bg-white flex flex-col justify-center items-center p-8'
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.3 }}
                                >
                                    <img
                                        src={imageEmpty}
                                        className='w-full h-full object-scale-down mb-4' 
                                    />
                                    <motion.div
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <Link onClick={close} to={"/"} className='block bg-blue-600 px-6 py-3 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'>
                                            Shop Now
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {
                        cartItem[0] && (
                            <motion.div 
                                className='p-2 sticky bottom-0 bg-white z-20'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.7 }}
                            >
                                <motion.div 
                                    className='bg-slate-800 text-white px-4 font-bold text-base py-4 rounded-lg flex items-center gap-4 justify-between shadow-lg'
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <div>
                                        {DisplayPriceInRupees(totalPrice)}
                                    </div>
                                    <motion.button 
                                        onClick={redirectToCheckoutPage} 
                                        className='flex items-center gap-1 hover:bg-slate-700 px-3 py-1 rounded transition-colors'
                                    >
                                        Proceed
                                        <span><FaCaretRight/></span>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </motion.div>
        </motion.section>
    </AnimatePresence>
  )
}

export default DisplayCartItem
