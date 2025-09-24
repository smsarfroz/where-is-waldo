import './App.css';
import SettingImage from './Components/SettingImage/SettingImage.jsx';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './assets/waldo-icon.png';
import { useState } from 'react';
import "@fontsource/cormorant-garamond";
import '@fontsource/nunito-sans';

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';
// console.log(VITE_BASE_URL);

const useFetchData = () => {
  const api1 = `${VITE_BASE_URL}/settings`;
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      
      const [res1] = await Promise.all([
        fetch(api1),
      ]); 

      if (!res1.ok) {
        throw new Error(`HTTP error! Status: ${Response.status}`);
      } 

      const data1 = await res1.json();

      setSettingsData(data1);
      
      setLoading(false);
  
    } catch (error) {
      setError(error);
    };
  };
  fetchData();

  return {loading, error, settingsData};
};

function App() {
  const { loading, error, settingsData } = useFetchData();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return error;
  }


  return (
    <div>
      {/* <SettingImage /> */}

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

      <Outlet />  
      
      <footer>

      </footer>
    </div>
  )
}

export default App
