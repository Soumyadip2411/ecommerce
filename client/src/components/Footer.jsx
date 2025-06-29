import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }} 
      className='border-t border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50'
    >
        <div className='container mx-auto p-6 text-center flex flex-col lg:flex-row lg:justify-between gap-4'>
            <p className='text-secondary-200 font-medium'>© All Rights Reserved to Soumya.</p>

            <div className='flex items-center gap-6 justify-center text-2xl'>
                <motion.a 
                  href='https://www.facebook.com/share/1F1BxQ4LR2/' 
                  className='text-secondary-200 hover:text-accent-200 transition-colors duration-300 p-2 rounded-full hover:bg-accent-200/10'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                    <FaFacebook/>
                </motion.a>
                <motion.a 
                  href='https://www.instagram.com/soumyadippramanik004?igsh=MXdkOG1ubm5oMG83Zg==' 
                  className='text-secondary-200 hover:text-[#a01ea5] transition-colors duration-300 p-2 rounded-full hover:bg-accent-200/10'
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                    <FaInstagram/>
                </motion.a>
                <motion.a 
                  href='https://www.linkedin.com/in/soumyadip-pramanik-72a956307/' 
                  className='text-secondary-200 hover:text-[#216f96] transition-colors duration-300 p-2 rounded-full hover:bg-accent-200/10'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                    <FaLinkedin/>
                </motion.a>
            </div>
        </div>
    </motion.footer>
  )
}

export default Footer
