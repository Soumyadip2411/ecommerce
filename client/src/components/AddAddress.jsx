import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'
import { motion, AnimatePresence } from 'framer-motion'

const AddAddress = ({close}) => {
    const { register, handleSubmit,reset } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        
    
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data : {
                    address_line :data.addressline,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const modalVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: { 
            opacity: 0,
            transition: { duration: 0.2 }
        }
    }

    const contentVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: -50
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: { 
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            y: -50,
            transition: { duration: 0.2 }
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
            className='bg-black fixed top-0 bottom-0 left-0 right-0 z-50 bg-opacity-70 h-screen overflow-auto'
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div 
                className='bg-white max-w-lg w-full p-6 mt-8 mx-auto rounded-lg shadow-xl'
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className='flex items-center justify-between gap-4 mb-6'>
                    <h2 className='font-semibold text-xl text-gray-800'>Add Address</h2>
                    <motion.button 
                        onClick={close} 
                        className='hover:text-red-500 transition-colors'
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <IoClose size={25}/>
                    </motion.button>
                </div>
                <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <motion.div 
                        className='grid gap-2'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <label htmlFor='addressline' className='font-medium text-gray-700'>Address Line</label>
                        <input
                            type='text'
                            id='addressline' 
                            className='border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                            {...register("addressline",{required : true})}
                        />
                    </motion.div>
                    <motion.div 
                        className='grid gap-2'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <label htmlFor='city' className='font-medium text-gray-700'>City</label>
                        <input
                            type='text'
                            id='city' 
                            className='border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                            {...register("city",{required : true})}
                        />
                    </motion.div>
                    <motion.div 
                        className='grid gap-2'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <label htmlFor='state' className='font-medium text-gray-700'>State</label>
                        <input
                            type='text'
                            id='state' 
                            className='border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                            {...register("state",{required : true})}
                        />
                    </motion.div>
                    <motion.div 
                        className='grid gap-2'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <label htmlFor='pincode' className='font-medium text-gray-700'>Pincode</label>
                        <input
                            type='text'
                            id='pincode' 
                            className='border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                            {...register("pincode",{required : true})}
                        />
                    </motion.div>
                    <motion.div 
                        className='grid gap-2'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label htmlFor='country' className='font-medium text-gray-700'>Country</label>
                        <input
                            type='text'
                            id='country' 
                            className='border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                            {...register("country",{required : true})}
                        />
                    </motion.div>
                    <motion.div 
                        className='grid gap-2'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <label htmlFor='mobile' className='font-medium text-gray-700'>Mobile No.</label>
                        <input
                            type='text'
                            id='mobile' 
                            className='border border-gray-300 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                            {...register("mobile",{required : true})}
                        />
                    </motion.div>

                    <motion.button 
                        type='submit' 
                        className='bg-blue-600 hover:bg-blue-700 w-full py-3 font-semibold mt-4 rounded-lg transition-colors text-white'
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Submit
                    </motion.button>
                </form>
            </motion.div>
        </motion.section>
    </AnimatePresence>
  )
}

export default AddAddress
