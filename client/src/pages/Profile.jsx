import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';
import { motion } from 'framer-motion';


const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

    const handleOnChange  = (e)=>{
        const { name, value} = e.target 

        setUserData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
  return (
    <motion.div 
      className='p-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

        {/**profile upload and display image */}
        <motion.div 
          className='w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-200 flex items-center justify-center rounded-full overflow-hidden drop-shadow-md'
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            {
                user.avatar ? (
                    <img 
                      alt={user.name}
                      src={user.avatar}
                      className='w-full h-full object-cover'
                    />
                ) : (
                    <FaRegUserCircle size={65} className='text-white'/>
                )
            }
        </motion.div>
        <motion.button 
          onClick={()=>setProfileAvatarEdit(true)} 
          className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-100 hover:text-white px-3 py-1 rounded-full mt-3 transition-colors duration-200'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Edit
        </motion.button>
        
        {
            openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
            )
        }

        {/**name, mobile , email, change password */}
        <motion.form 
          className='my-6 grid gap-4' 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
            <motion.div 
              className='grid gap-2'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
                <label className='font-medium text-gray-700'>Name</label>
                <input
                    type='text'
                    placeholder='Enter your name' 
                    className='p-3 bg-gray-50 outline-none border border-gray-300 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20 rounded-lg transition-all'
                    value={userData.name}
                    name='name'
                    onChange={handleOnChange}
                    required
                />
            </motion.div>
            <motion.div 
              className='grid gap-2'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
                <label htmlFor='email' className='font-medium text-gray-700'>Email</label>
                <input
                    type='email'
                    id='email'
                    placeholder='Enter your email' 
                    className='p-3 bg-gray-50 outline-none border border-gray-300 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20 rounded-lg transition-all'
                    value={userData.email}
                    name='email'
                    onChange={handleOnChange}
                    required
                />
            </motion.div>
            <motion.div 
              className='grid gap-2'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
                <label htmlFor='mobile' className='font-medium text-gray-700'>Mobile</label>
                <input
                    type='text'
                    id='mobile'
                    placeholder='Enter your mobile' 
                    className='p-3 bg-gray-50 outline-none border border-gray-300 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20 rounded-lg transition-all'
                    value={userData.mobile}
                    name='mobile'
                    onChange={handleOnChange}
                    required
                />
            </motion.div>

            <motion.button 
              className='bg-primary-100 hover:bg-primary-200 text-white px-4 py-3 font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
                {
                    loading ? "Loading..." : "Submit"
                }
            </motion.button>
        </motion.form>
    </motion.div>
  )
}

export default Profile
