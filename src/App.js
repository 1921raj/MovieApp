
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { setBannerData ,setImageURL } from './store/movieoSlice';
import {useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch()

  const fetchTrendingData = async()=>{
     try { 
      const response = await axios.get('/trending/all/week')

      dispatch(setBannerData(response.data.results))

      console.log('response',)
     } catch (error) {
      console.log("error",error)
     }
  }

  const fetchConfiguration = async()=>{
    try {
      const response =await axios.get("/configuration")
      dispatch(setImageURL(response.data.images.secure_base_url+"original"))
       console.log("Configurtion Data ",response.data.images.secure_base_url+"original")
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchTrendingData()
    fetchConfiguration()
  },[])
  

  return (
    <main className='pb-12 lg:pb-0'> 
      <Header/>
      <div className='pt-16'>
        <Outlet/>
        </div >
      <Footer/>
      <MobileNavigation/>
    </main>
  );
}

export default App;