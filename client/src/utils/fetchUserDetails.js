import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"

const fetchUserDetails = async()=>{
    const accessToken = localStorage.getItem('accesstoken')
    if (!accessToken) return null; // Don't fetch if not logged in
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Optionally clear user state or redirect to login
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('refreshToken');
            return null;
        }
        return null;
    }
}

export default fetchUserDetails