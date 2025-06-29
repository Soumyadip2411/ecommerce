import React from 'react'
import { motion } from 'framer-motion'

const CardLoading = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const shimmerVariants = {
    animate: {
      x: ["-100%", "100%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  return (
    <motion.div 
      className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className='min-h-24 bg-gradient-to-r from-primary-100/10 to-primary-100/20 rounded-lg relative overflow-hidden'
        variants={shimmerVariants}
        animate="animate"
      >
        <motion.div 
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent'
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <motion.div 
        className='p-2 lg:p-3 bg-gradient-to-r from-primary-100/10 to-primary-100/20 rounded w-20 relative overflow-hidden'
        variants={shimmerVariants}
        animate="animate"
      >
        <motion.div 
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent'
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <motion.div 
        className='p-2 lg:p-3 bg-gradient-to-r from-primary-100/10 to-primary-100/20 rounded relative overflow-hidden'
        variants={shimmerVariants}
        animate="animate"
      >
        <motion.div 
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent'
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <motion.div 
        className='p-2 lg:p-3 bg-gradient-to-r from-primary-100/10 to-primary-100/20 rounded w-14 relative overflow-hidden'
        variants={shimmerVariants}
        animate="animate"
      >
        <motion.div 
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent'
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className='flex items-center justify-between gap-3'>
        <motion.div 
          className='p-2 lg:p-3 bg-gradient-to-r from-primary-100/10 to-primary-100/20 rounded w-20 relative overflow-hidden'
          variants={shimmerVariants}
          animate="animate"
        >
          <motion.div 
            className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent'
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <motion.div 
          className='p-2 lg:p-3 bg-gradient-to-r from-primary-100/10 to-primary-100/20 rounded w-20 relative overflow-hidden'
          variants={shimmerVariants}
          animate="animate"
        >
          <motion.div 
            className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent'
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CardLoading
