import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  
  return (
    <motion.section 
      className='bg-gradient-to-br from-slate-50 to-gray-50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        <div className='container mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
                {/**left for menu */}
                <motion.div 
                  className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r border-gray-200 bg-white rounded-lg shadow-sm'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <UserMenu/>
                </motion.div>


                {/**right for content */}
                <motion.div 
                  className='bg-white min-h-[75vh] rounded-lg shadow-sm p-4'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Outlet/>
                </motion.div>
        </div>
    </motion.section>
  )
}

export default Dashboard
