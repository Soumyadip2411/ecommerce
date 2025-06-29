import React from 'react'
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion'

const AddFieldComponent = ({close,value,onChange,submit}) => {
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
    <motion.section 
      className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center p-4'
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
            <div className='flex items-center justify-between gap-3 mb-4'>
                <h1 className='font-semibold text-lg text-gray-800'>Add Field</h1>
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
            <motion.input
                 className='border border-gray-300 bg-gray-50 my-3 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all'
                 placeholder='Enter field name'
                 value={value}
                 onChange={onChange}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
            />
            <motion.button
                onClick={submit}
                className='bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg mx-auto w-fit block text-white font-medium transition-colors'
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
              Add Field
            </motion.button>
        </motion.div>
   </motion.section>
   </AnimatePresence>
  )
}

export default AddFieldComponent
