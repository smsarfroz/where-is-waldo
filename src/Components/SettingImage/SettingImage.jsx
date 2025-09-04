import { useRef } from "react";
import { useState } from "react";
import styles from "./SettingImage.module.css";
import Selector from "../Selector/Selector.jsx";

function SettingImage (){
    const mouseClickRef = useRef(null);
    const [coordx, setCoordx] = useState(null);
    const [coordy, setCoordy] = useState(null);

    const handleClick = (event) => {
        if (mouseClickRef.current) {
          const rect = mouseClickRef.current.getBoundingClientRect();
          const x = event.clientX - rect.x;
          const y = event.clientY - rect.y;

          console.log(`Click coordinates relative to element: X=${x}, Y=${y}`);
          setCoordx(x);
          setCoordy(y);
          console.log('coordx, coordy: ', coordx, coordy);
        }
    };  

    const styleSelector = {
        backgroundColor: 'red', 
        transform: `translate(-50%, -50%) translate(${coordx}px, ${coordy}px)`,
    };

    return (
        <div ref={mouseClickRef} onClick={handleClick} className={styles.Image}>
            
            <Selector style={styleSelector} />
        </div>
    )
};

export default SettingImage;