import React from 'react'
import { IoClose } from 'react-icons/io5'
import { motion } from 'framer-motion'

const ViewImage = ({url,close}) => {
  return (
    <motion.div 
      className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 flex justify-center items-center z-50 p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
        <motion.div 
          className='w-full max-w-md max-h-[80vh] p-4 bg-white rounded-lg shadow-2xl'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
            <motion.button 
              onClick={close} 
              className='w-fit ml-auto block text-secondary-200 hover:text-error-200 transition-colors p-2 rounded-full hover:bg-gray-100'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
                <IoClose size={25}/>
            </motion.button>
            <motion.img 
                src={url}
                alt='full screen'
                className='w-full h-full object-scale-down'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            />
        </motion.div>
    </motion.div>
  )
}

export default ViewImage
