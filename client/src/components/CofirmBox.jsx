import React from 'react'
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion'

const CofirmBox = ({cancel,confirm,close}) => {
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
      y: -30
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
      y: -30,
      transition: { duration: 0.2 }
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

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center'
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          className='bg-white w-full max-w-md p-6 rounded-lg shadow-xl'
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className='flex justify-between items-center gap-3 mb-4'>
            <h1 className='font-semibold text-lg text-gray-800'>Permanent Delete</h1>
            <motion.button 
              onClick={close}
              className='hover:text-red-500 transition-colors'
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <IoClose size={25} />
            </motion.button>
          </div>
          <motion.p 
            className='my-6 text-gray-600'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Are you sure you want to permanently delete this item?
          </motion.p>
          <div className='w-fit ml-auto flex items-center gap-3'>
            <motion.button 
              onClick={cancel} 
              className='px-6 py-2 border rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors'
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Cancel
            </motion.button>
            <motion.button 
              onClick={confirm} 
              className='px-6 py-2 border rounded-lg border-red-500 text-red-600 hover:bg-red-50 transition-colors'
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Confirm
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CofirmBox
