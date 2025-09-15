import './App.css';
import SettingImage from './Components/SettingImage/SettingImage.jsx';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './assets/waldo-icon.png';

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';
// console.log(VITE_BASE_URL);

function App() {

  
  return (
    <div>
      {/* <SettingImage /> */}

      <nav>
        <div className="navContent">
          <img src={logo} alt="" className='logo'/>
          <div className='navigation'>
            <Link>HOME</Link>
            <Link>GAMES</Link>
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
