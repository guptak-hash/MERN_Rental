import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8000'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([]);

    const navigate = useNavigate();

    // function to check if user is logged in
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner')
            } else {
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to fetch all cars 
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/cars')
            console.log('featured section cars >> ',data)
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to logout user
    const logout=()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization']=''
        toast.success('You have been logged out')
    }

    // useEffect to retrieve token from local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token)
        fetchCars();
    }, [])

    // useEffect to fetch user data if token is available
    useEffect(() => {
        if (token) {
            // in all requests, token will be added automatically
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        }
    }, [token])
    const value = {
        navigate,axios,user,setUser,token,setToken,isOwner,
        setIsOwner,fetchUser,showLogin,setShowLogin,logout,
        fetchCars,cars,setCars,pickupDate,setPickupDate,
        returnDate,setReturnDate
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}