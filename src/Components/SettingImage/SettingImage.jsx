import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./SettingImage.module.css";
import Selector from "../Selector/Selector.jsx";
import { waldoContext } from "../../waldoContext.js";
import { useParams } from "react-router-dom";
// const width = 1200;
// const height = 700;
const size = 20;

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "/api";
const useFetch = (coordx, coordy, width, height) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [option, setOption] = useState(null);

  // console.log("width, height ", width, height);
  useEffect(() => {
    const xpercent = (coordx / width) * 100;
    const ypercent = (coordy / height) * 100;

    let data = {};
    data["option"] = option;
    data["xpercentu"] = xpercent;
    data["ypercentu"] = ypercent;

    if (option && option != 'Cancel') {
      fetch(`${VITE_BASE_URL}/play/0/verify/0`, {
        mode: "cors",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          setLoading(true);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          setLoading(false);
          setMessage(response.message);
          setOption(null);
        })
        .catch((error) => {
          setLoading(false);
          setMessage(null);
          setOption(null);
          console.error(
            `There was a problem with the fetch operation: `,
            error
          );
        });
    } else if (option == 'Cancel') {
      setOption(null);
    }
  }, [option, coordx, coordy, width, height]);
  return { loading, message, option, setMessage, setOption };
};

function SettingImage() {
  const mouseClickRef = useRef(null);
  const [coordx, setCoordx] = useState(null);
  const [coordy, setCoordy] = useState(null);
  const [imgDim, setImgDim] = useState({ width: 1200, height: 700});
  const [left, setLeft] = useState(true);
  const [up, setUp] = useState(true);
  
  // console.log('coordx, coordy ', coordx, coordy);
  const [showSelector, setShowSelector] = useState(false);

  const {loading, message, option, setMessage, setOption} = useFetch(coordx, coordy, imgDim.width, imgDim.height);
  
  const { settingsData } = useContext(waldoContext);
  let params = useParams();
  let gameid = params.id;
  let id = parseInt(gameid);
  const setting = settingsData[id - 1];
  
  const handleImageLoad = (e) => {
    const img = e.target;
    setImgDim({
      width: img.offsetWidth,
      height: img.offsetHeight
    });
  };

  function handleClick(event) {
    if (mouseClickRef.current && !option) {
      setShowSelector(true);
      const rect = mouseClickRef.current.getBoundingClientRect();
      const x = event.clientX - rect.x;
      const y = event.clientY - rect.y;

      setCoordx(x);
      setCoordy(y);
      const rightSide = imgDim.width - x;
      const lowerSide = imgDim.height - y;

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
  }
  const styleSelector = {
    transform: `translateY(-${imgDim.height}px) translate(-50%, -50%) translate(${coordx}px, ${coordy}px)`,
  };
  const style2 = {
    backgroundColor: "blue",
    transform: `
      translateY(-${imgDim.height}px)
      ${left ? `translate(-100%, 0) ` : " "}
      ${up ? `translate(0, -100%) ` : " "}
      translate(${coordx + size / 2}px, ${coordy + size / 2}px) 
      ${left ? `translateX(${-size}px) ` : ` `} 
      ${up ? `translateY(${-size}px) ` : ` `}
      `,
  };
  const style = {
    // backgroundImage: `url('${setting.imglocation}')`,
    // objectFit: 'cover'
  };
  return (
    <div ref={mouseClickRef} onClick={handleClick} className={styles.Image} style={style}>
      <img 
        src={setting.imglocation} 
        alt="Game scene" 
        style={style}
        className={styles.imgtag}
        onLoad={handleImageLoad}
      />
      {(() => {
        if (loading) {
          return <p>Loading...</p>;
        } else if (message) {
          setTimeout(() => {
            setMessage(null);
          }, 2000);
          return <p>{message}</p>;
        } else {
          return (
            showSelector && 
            <Selector
              style={styleSelector}
              style2={style2}
              className={styles.box}
              setOption={setOption}
              setShowSelector={setShowSelector}
              gameid={gameid}
            />
          );
        }
      })()}
    </div>
  );
}

export default SettingImage;
