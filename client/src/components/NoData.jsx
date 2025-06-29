import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'
import { motion } from 'framer-motion'

const NoData = () => {
  return (
    <motion.div 
      className='flex flex-col items-center justify-center p-4 gap-2'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={noDataImage}
        alt='no data'
        className='w-36' 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.p 
        className='text-secondary-200 font-medium'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        No Data
      </motion.p>
    </motion.div>
  )
}

export default NoData
