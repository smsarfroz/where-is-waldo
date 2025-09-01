import { useRef } from "react";
import styles from "./SettingImage.jsx";

function SettingImage (){
    const mouseClickRef = useRef(null);
    
    const handleClick = (event) => {
        if (mouseClickRef.current) {
          const rect = mouseClickRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          console.log(`Click coordinates relative to element: X=${x}, Y=${y}`);
        }
    };

    return (
        <div ref={mouseClickRef} onClick={handleClick} className={styles.Image}>
            click me!
        </div>
    )
};

export default SettingImage;