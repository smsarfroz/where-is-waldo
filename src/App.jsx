import './App.css'
import SettingImage from './Components/SettingImage/SettingImage.jsx';

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';
// console.log(VITE_BASE_URL);

function App() {

  
  return (
    <>
      <SettingImage />
    </>
  )
}

export default App
