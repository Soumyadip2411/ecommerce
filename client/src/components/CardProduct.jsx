import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'
import { motion } from 'framer-motion'

const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
    const [loading,setLoading] = useState(false)

    const cardVariants = {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { 
          duration: 0.4,
          ease: "easeOut"
        }
      },
      hover: {
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      },
      tap: {
        scale: 0.98,
        transition: { duration: 0.1 }
      }
    }

    const imageVariants = {
      hover: {
        scale: 1.1,
        transition: { duration: 0.3 }
      }
    }

    const badgeVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.3 }
      }
    }
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-lg transition-shadow block' >
        <motion.div 
          className='min-h-20 w-full max-h-24 lg:max-h-32 rounded-lg overflow-hidden'
          variants={imageVariants}
        >
          <img 
            src={data.image[0]}
            className='w-full h-full object-scale-down lg:scale-125'
            alt={data.name}
          />
        </motion.div>
        
        <div className='flex items-center gap-1'>
          <motion.div 
            className='rounded text-xs w-fit p-[1px] px-2 text-primary-100 bg-primary-100/10 border border-primary-100/20'
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            10 min 
          </motion.div>
          <div>
            {
              Boolean(data.discount) && (
                <motion.p 
                  className='text-success-100 bg-success-100/10 border border-success-100/20 px-2 w-fit text-xs rounded-full'
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  {data.discount}% discount
                </motion.p>
              )
            }
          </div>
        </div>
        
        <motion.div 
          className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 text-gray-800'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {data.name}
        </motion.div>
        
        <motion.div 
          className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base text-gray-600'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {data.unit} 
        </motion.div>

        <motion.div 
          className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className='flex items-center gap-1'>
            <div className='font-semibold text-gray-900'>
              {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))} 
            </div>
          </div>
          <div className=''>
            {
              data.stock == 0 ? (
                <motion.p 
                  className='text-red-500 text-sm text-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Out of stock
                </motion.p>
              ) : (
                <AddToCartButton data={data} />
              )
            }
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default CardProduct
