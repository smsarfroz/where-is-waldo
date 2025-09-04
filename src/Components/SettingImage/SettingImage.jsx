import { useRef } from "react";
import { useState } from "react";
import styles from "./SettingImage.module.css";
import Selector from "../Selector/Selector.jsx";
const width = 500;
const height = 500;
const size = 20;

function SettingImage() {
  const mouseClickRef = useRef(null);
  const [coordx, setCoordx] = useState(null);
  const [coordy, setCoordy] = useState(null);
  const [left, setLeft] = useState(true);
  const [up, setUp] = useState(true);

  const handleClick = (event) => {
    if (mouseClickRef.current) {
      const rect = mouseClickRef.current.getBoundingClientRect();
      const x = event.clientX - rect.x;
      const y = event.clientY - rect.y;

      console.log(`Click coordinates relative to element: X=${x}, Y=${y}`);
      setCoordx(x);
      setCoordy(y); 
      //   console.log('coordx, coordy: ', coordx, coordy); 
      const rightSide = width - x;
      const lowerSide = height - y;

      if (rightSide > x) {
        setLeft(false);
      } else {
        setLeft(true);
      }
      if (lowerSide > y) {
        setUp(false);
      } else {
        setUp(true);
      }
    }
  };
    
  const styleSelector = {
    backgroundColor: "red",
    transform: `translate(-50%, -50%) translate(${coordx}px, ${coordy}px)`,
  };
  console.log(left, up);
  const style2 = {
    backgroundColor: "blue",
    transform: `
      ${left ? `translate(-100%, 0) ` : ' '}
      ${up ? `translate(0, -100%) ` : ' '}
      translate(${coordx + size/2}px, ${coordy + size/2}px) 
      ${left ? `translateX(${-size  }px) ` : ` `} 
      ${up ? `translateY(${-size  }px) ` : ` `}
      `,
  };

  return (
    <div ref={mouseClickRef} onClick={handleClick} className={styles.Image}>
      <Selector style={styleSelector} style2={style2} />
    </div>
  );
}

export default SettingImage;
