import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider from './provider/GlobalProvider';
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from './components/CartMobile';
import VideoHero from './components/VideoHero';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [openCartSection, setOpenCartSection] = useState(false);
  

  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      if (!userData || !userData.data) {
        // handle unauthenticated state, e.g., clear user state or do nothing
        return;
      }
      dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
    }
  }

  

  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
  },[])

  return (
    <GlobalProvider> 
      <div className="relative min-h-screen w-full">
        <div className="fixed inset-0 -z-10">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 via-green-50 to-emerald-100" />
        </div>
        
        <Header openCartSection={openCartSection} setOpenCartSection={setOpenCartSection}/>
        
        {/* VideoHero after header for proper sequence */}
        {location.pathname === '/' && (
          <div className="relative">
            <VideoHero />
          </div>
        )}
        
        <main className='min-h-[78vh] relative z-10'>
            <Outlet/>
        </main>
        <Footer/>
        <Toaster/>
        {
          location.pathname !== '/checkout' &&
          location.pathname !== '/cart' &&
          !openCartSection && (
            <CartMobileLink/>
          )
        }
      </div>
    </GlobalProvider>
  )
}

export default App
