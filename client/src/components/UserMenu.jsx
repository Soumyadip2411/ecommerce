import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'
import { motion } from 'framer-motion'

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          
          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            navigate("/")
          }
        } catch (error) {
          console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close){
        close()
      }
   }

   const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
   }

   const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    }
   }

   const linkVariants = {
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
   }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <motion.div 
          className='font-semibold text-lg text-gray-800'
          variants={itemVariants}
        >
          My Account
        </motion.div>
        <motion.div 
          className='text-sm flex items-center gap-2 mb-3'
          variants={itemVariants}
        >
          <span className='max-w-52 text-ellipsis line-clamp-1 text-gray-600'>
            {user.name || user.mobile} 
            <span className='text-medium text-red-600 ml-1'>
              {user.role === "ADMIN" ? "(Admin)" : "" }
            </span>
          </span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-blue-600 transition-colors'>
              <HiOutlineExternalLink size={15}/>
            </Link>
          </motion.div>
        </motion.div>

        <Divider/>

        <motion.div 
          className='text-sm grid gap-1'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            {
              isAdmin(user.role) && (
                <motion.div variants={itemVariants}>
                  <Link 
                    onClick={handleClose} 
                    to={"/dashboard/category"} 
                    className='px-3 py-2 hover:bg-orange-100 rounded-lg transition-colors block'
                  >
                    Category
                  </Link>
                </motion.div>
              )
            }

            {
              isAdmin(user.role) && (
                <motion.div variants={itemVariants}>
                  <Link 
                    onClick={handleClose} 
                    to={"/dashboard/subcategory"} 
                    className='px-3 py-2 hover:bg-orange-100 rounded-lg transition-colors block'
                  >
                    Sub Category
                  </Link>
                </motion.div>
              )
            }

            {
              isAdmin(user.role) && (
                <motion.div variants={itemVariants}>
                  <Link 
                    onClick={handleClose} 
                    to={"/dashboard/upload-product"} 
                    className='px-3 py-2 hover:bg-orange-100 rounded-lg transition-colors block'
                  >
                    Upload Product
                  </Link>
                </motion.div>
              )
            }

            {
              isAdmin(user.role) && (
                <motion.div variants={itemVariants}>
                  <Link 
                    onClick={handleClose} 
                    to={"/dashboard/product"} 
                    className='px-3 py-2 hover:bg-orange-100 rounded-lg transition-colors block'
                  >
                    Product
                  </Link>
                </motion.div>
              )
            }

            <motion.div variants={itemVariants}>
              <Link 
                onClick={handleClose} 
                to={"/dashboard/myorders"} 
                className='px-3 py-2 hover:bg-orange-100 rounded-lg transition-colors block'
              >
                My Orders
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link 
                onClick={handleClose} 
                to={"/dashboard/address"} 
                className='px-3 py-2 hover:bg-orange-100 rounded-lg transition-colors block'
              >
                Save Address
              </Link>
            </motion.div>

            <motion.button 
              onClick={handleLogout} 
              className='text-left px-3 py-2 hover:bg-red-100 rounded-lg transition-colors text-red-600 hover:text-red-700'
              variants={itemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Log Out
            </motion.button>
        </motion.div>
    </motion.div>
  )
}

export default UserMenu
