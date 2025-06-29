import React, { useEffect, useRef, useState } from 'react'
import { Link, } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { motion } from 'framer-motion'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    const handleRedirectProductListpage = ()=>{
        const subcategory = subCategoryData.find(sub =>{
          const filterData = sub.category.some(c => {
            return c._id == id
          })

          return filterData ? true : null
        })
        const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`

        return url
    }

    const redirectURL =  handleRedirectProductListpage()

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    const headerVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4 }
        }
    }

    const buttonVariants = {
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.9,
            transition: { duration: 0.1 }
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div 
                className='container mx-auto p-4 flex items-center justify-between gap-4'
                variants={headerVariants}
            >
                <h3 className='font-semibold text-lg md:text-xl text-gray-800'>{name}</h3>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to={redirectURL} className='text-primary-100 hover:text-primary-200 font-medium transition-colors'>
                        See All
                    </Link>
                </motion.div>
            </motion.div>
            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <motion.div
                                    key={"CategorywiseProductDisplay123" + index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <CardLoading />
                                </motion.div>
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <motion.div
                                    key={p._id + "CategorywiseProductDisplay" + index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <CardProduct
                                        data={p}
                                    />
                                </motion.div>
                            )
                        })
                    }
                </div>
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <motion.button 
                        onClick={handleScrollLeft} 
                        className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-3 rounded-full transition-colors'
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <FaAngleLeft />
                    </motion.button>
                    <motion.button 
                        onClick={handleScrollRight} 
                        className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-3 text-lg rounded-full transition-colors'
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <FaAngleRight />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default CategoryWiseProductDisplay
