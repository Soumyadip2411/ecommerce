import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
        <motion.section 
            className='w-full container mx-auto px-2 min-h-screen flex items-center justify-center'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className='bg-white w-full max-w-lg rounded-lg p-8 shadow-xl'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className='text-2xl font-bold text-center mb-6 text-gray-800'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Forgot Password
                </motion.h1>
                <motion.p 
                    className='text-center text-gray-600 mb-6'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Enter your email to receive a password reset link
                </motion.p>
                
                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <motion.div 
                        className='grid gap-2'
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor='email' className='font-medium text-gray-700'>Email</label>
                        <input
                            type='email'
                            id='email'
                            className='border border-gray-300 bg-gray-50 p-3 rounded-lg outline-none focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20 transition-all'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </motion.div>
             
                    <motion.button 
                        disabled={!valideValue} 
                        className={`${valideValue ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-400 cursor-not-allowed"} text-white py-3 rounded-lg font-semibold tracking-wide transition-colors duration-200 shadow-md hover:shadow-lg`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={valideValue ? { scale: 1.02 } : {}}
                        whileTap={valideValue ? { scale: 0.98 } : {}}
                    >
                        Send OTP
                    </motion.button>
                </form>

                <motion.div 
                    className='text-center mt-6 pt-6 border-t'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className='text-gray-600'>
                        Already have an account?{' '}
                        <Link to={"/login"} className='font-semibold text-primary-100 hover:text-primary-200 transition-colors'>
                            Login
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default ForgotPassword


