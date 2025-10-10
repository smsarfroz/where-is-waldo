import './App.css';
import SettingImage from './Components/SettingImage/SettingImage.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './assets/waldo-icon.png';
import { useState } from 'react';
import "@fontsource/cormorant-garamond";
import '@fontsource/nunito-sans';
import { waldoContext } from './waldoContext.js';
import ErrorPage from './ErrorPage.jsx';
import Loading from './Components/Loading/Loading.jsx';
import { useEffect } from 'react';

import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';
// console.log(VITE_BASE_URL);

const useFetchData = () => {
  const api1 = `${VITE_BASE_URL}/settings`;
  const api2 = `${VITE_BASE_URL}/characters`;
  const [settingsData, setSettingsData] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [res1, res2] = await Promise.all([
          fetch(api1),
          fetch(api2)
        ]); 

        if (!res1.ok) {
          throw new Error(`HTTP error! Status: ${Response.status}`);
        } 
        if (!res2.ok) {
          throw new Error(`HTTP error! Status: ${Response.status}`);
        }
        
        const data1 = await res1.json();
        const data2 = await res2.json();

        setSettingsData(data1);
        setCharacters(data2);
        
        setLoading(false);
    
      } catch (error) {
        setError(error);
      };
    };
    fetchData();
  }, [api1, api2]);

  return {loading, error, settingsData, characters};
};

function App() {
  const { loading, error, settingsData, characters } = useFetchData();

  if (loading) {
    return <Loading />;
    // return <p>Loading...</p>;
  }
  if (error) {
    // console.log("error ", error);
    return <ErrorPage />;
  }


  return (
    <div>

      <nav>
        <div className="navContent">
          <img src={logo} alt="" className='logo'/>
          <div className='navigation'>
            <Link to='/'>HOME</Link>
            <Link to='/games'>GAMES</Link>
            <Link>LEADERBOARD</Link>
            <Link>ABOUT</Link>
          </div>
        </div>
      </nav>
      <hr className="lineBreak"/>

      <waldoContext.Provider value={{settingsData, characters}}>
        <Outlet />  
      </waldoContext.Provider>

      <footer>

      </footer>
    </div>
  )
}

export default App
