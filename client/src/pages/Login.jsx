import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { motion } from 'framer-motion'

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                ...SummaryApi.login,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : "",
                })
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4 }
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
        <motion.section 
            className='w-full container mx-auto px-2 min-h-screen flex items-center justify-center'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
                    Welcome Back
                </motion.h1>

                <form className='grid gap-6' onSubmit={handleSubmit}>
                    <motion.div 
                        className='grid gap-2'
                        variants={itemVariants}
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
                    <motion.div 
                        className='grid gap-2'
                        variants={itemVariants}
                    >
                        <label htmlFor='password' className='font-medium text-gray-700'>Password</label>
                        <div className='border border-gray-300 bg-gray-50 p-3 rounded-lg flex items-center focus-within:border-primary-100 focus-within:ring-2 focus-within:ring-primary-100/20 transition-all'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none bg-transparent'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <motion.div 
                                onClick={() => setShowPassword(preve => !preve)} 
                                className='cursor-pointer text-gray-500 hover:text-gray-700 transition-colors'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link to={"/forgot-password"} className='block ml-auto text-sm text-primary-100 hover:text-primary-200 transition-colors'>
                                Forgot password?
                            </Link>
                        </motion.div>
                    </motion.div>
    
                    <motion.button 
                        disabled={!valideValue} 
                        className={`${valideValue ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-400 cursor-not-allowed"} text-white py-3 rounded-lg font-semibold tracking-wide transition-colors duration-200 shadow-md hover:shadow-lg`}
                        variants={buttonVariants}
                        whileHover={valideValue ? "hover" : {}}
                        whileTap={valideValue ? "tap" : {}}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Login
                    </motion.button>
                </form>

                <motion.div 
                    className='text-center mt-6 pt-6 border-t'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className='text-gray-600'>
                        Don't have an account?{' '}
                        <Link to={"/register"} className='font-semibold text-blue-600 hover:text-blue-700 transition-colors'>
                            Register
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default Login

