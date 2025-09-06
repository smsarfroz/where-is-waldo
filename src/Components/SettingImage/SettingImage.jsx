import { useRef } from "react";
import { useState } from "react";
import styles from "./SettingImage.module.css";
import Selector from "../Selector/Selector.jsx";
const width = 500;
const height = 500;
const size = 20;

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';

function SettingImage() {
  const mouseClickRef = useRef(null);
  const [coordx, setCoordx] = useState(null);
  const [coordy, setCoordy] = useState(null);
  const [left, setLeft] = useState(true);
  const [up, setUp] = useState(true);
  const [option, setOption] = useState(null);
  const [showSelector, setShowSelector] = useState(true);

  console.log('option: ', option);
  function handleClick(event) {
    setShowSelector(true);
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

      // console.log('coordx, width :', coordx/width);
      // console.log('coordy, height :', coordy/height);
      const xpercent = (coordx / width) * 100;
      const ypercent = (coordy / height) * 100;

      let data = {};
      data["option"] = option;
      data["x-percent"] =xpercent; 
      data["y-percent"] =ypercent; 

      console.log("data: ", data);
      if (option) {
        // setShowSelector(false);
        // fetch((`${VITE_BASE_URL}/play/1/verify/1`), {
        //   mode: 'cors',
        //   method: 'post',
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(data)
        // })
        // .then((response) => {
        //   if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        //   }
        //   return response.json();
        // })
        // .then((response) => {
        //   // display verification status to the user
        //   console.log(`verification successfull`);
        // })
        // .catch(error => {
        //   console.error(`There was a problem with the fetch operation: `, error);
        // })
        // setOption(null);
      }
    }
  }
    
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
      {
        showSelector ? (

          <Selector style={styleSelector} style2={style2} className={styles.box} setOption={setOption}/>

        ) : null
      }
    </div>
  );
}

export default SettingImage;
