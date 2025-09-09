import { useRef } from "react";
import { useState } from "react";
import styles from "./SettingImage.module.css";
import Selector from "../Selector/Selector.jsx";
const width = 1200;
const height = 700;
const size = 20;

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "/api";

function SettingImage() {
  const mouseClickRef = useRef(null);
  const [coordx, setCoordx] = useState(null);
  const [coordy, setCoordy] = useState(null);
  const [left, setLeft] = useState(true);
  const [up, setUp] = useState(true);
  const [option, setOption] = useState(null);
  const [showSelector, setShowSelector] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleClick(event) {
    console.log("Click");
    console.log("option ", option);
    console.log("selector", showSelector);
    if (mouseClickRef.current && !option) {
      setShowSelector(true);
      const rect = mouseClickRef.current.getBoundingClientRect();
      const x = event.clientX - rect.x;
      const y = event.clientY - rect.y;

      console.log(`Click coordinates relative to element: X=${x}, Y=${y}`);
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

      const xpercent = (x / width) * 100;
      const ypercent = (y / height) * 100;

      let data = {};
      data["option"] = option;
      data["xpercentu"] = xpercent;
      data["ypercentu"] = ypercent;

      console.log("data: ", data);
      if (option) {
        fetch(`${VITE_BASE_URL}/play/0/verify/0`, {
          mode: "cors",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            setShowSelector(false);
            setLoading(true);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("response ", response);
            return response.json();
          })
          .then((response) => {
            console.log("response.message ", response.message);
            console.log(`verification successfull`);
            setLoading(false);
            setMessage("Your pick is correct!");
          })
          .catch((error) => {
            setLoading(false);
            setMessage("Incorrect Pick");
            console.error(
              `There was a problem with the fetch operation: `,
              error
            );
          });
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
            <Selector
              style={styleSelector}
              style2={style2}
              className={styles.box}
              setOption={setOption}
            />
          );
        }
      })()}
      {/* {
        showSelector ? (

          <Selector style={styleSelector} style2={style2} className={styles.box} setOption={setOption}/>

        ) : null
      } */}
    </div>
  );
}

export default SettingImage;
