import { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./SettingImage.module.css";
import Selector from "../Selector/Selector.jsx";
const width = 1200;
const height = 700;
const size = 20;

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "/api";

const useFetch = (coordx, coordy) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [option, setOption] = useState(null);

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
  }, [option, coordx, coordy]);
  return { loading, message, option, setMessage, setOption };
};

function SettingImage() {
  const mouseClickRef = useRef(null);
  const [coordx, setCoordx] = useState(null);
  const [coordy, setCoordy] = useState(null);
  const [left, setLeft] = useState(true);
  const [up, setUp] = useState(true);
  
  const [showSelector, setShowSelector] = useState(false);

  const {loading, message, option, setMessage, setOption} = useFetch(coordx, coordy);
  function handleClick(event) {
    if (mouseClickRef.current && !option) {
      setShowSelector(true);
      const rect = mouseClickRef.current.getBoundingClientRect();
      const x = event.clientX - rect.x;
      const y = event.clientY - rect.y;

      setCoordx(x);
      setCoordy(y);
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
  }

  const styleSelector = {
    transform: `translate(-50%, -50%) translate(${coordx}px, ${coordy}px)`,
  };
  const style2 = {
    backgroundColor: "blue",
    transform: `
      ${left ? `translate(-100%, 0) ` : " "}
      ${up ? `translate(0, -100%) ` : " "}
      translate(${coordx + size / 2}px, ${coordy + size / 2}px) 
      ${left ? `translateX(${-size}px) ` : ` `} 
      ${up ? `translateY(${-size}px) ` : ` `}
      `,
  };

  return (
    <div ref={mouseClickRef} onClick={handleClick} className={styles.Image}>
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
            />
          );
        }
      })()}
    </div>
  );
}

export default SettingImage;
