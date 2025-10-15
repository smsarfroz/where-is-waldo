import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./SettingImage.module.css";
import Selector from "../Selector/Selector.jsx";
import { waldoContext } from "../../waldoContext.js";
import { useParams } from "react-router-dom";
import PlacePointer from "../PlacePointer/PlacePointer.jsx";
import WinDialog from "../WinDialog/WinDialog.jsx";
const size = 20;

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "/api";
const useFetch = (coordx, coordy, width, height, settingid, characters, setFoundCharactersCoords, setFoundCharsIds) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [option, setOption] = useState(null);
  
  useEffect(() => {
    const xpercent = (coordx / width) * 100;
    const ypercent = (coordy / height) * 100;

    let charid = 0;
    characters.map(character => {
      if (character.charname === option) {
        charid = character.charid;
      }
    });
    let data = {};
    data["option"] = option;
    data["xpercentu"] = xpercent;
    data["ypercentu"] = ypercent;

    if (option && option != 'Cancel') {
      fetch(`${VITE_BASE_URL}/settings/${settingid}/verify/${charid}`, {
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
          if (response.message === "Success") {
            setFoundCharsIds(prevArray => [...prevArray, charid]);
            setFoundCharactersCoords(prevArray => [...prevArray, {coordx: coordx, coordy: coordy}])
          }
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
  }, [characters, coordx, coordy, height, message, option, setFoundCharactersCoords, settingid, width, setFoundCharsIds]);
  return { loading, message, option, setMessage, setOption};
};

function SettingImage({foundCharsIds, setFoundCharsIds, time}) {
  const mouseClickRef = useRef(null);
  const [coordx, setCoordx] = useState(null);
  const [coordy, setCoordy] = useState(null);
  const [imgDim, setImgDim] = useState({ width: 1200, height: 700});
  const [left, setLeft] = useState(true);
  const [up, setUp] = useState(true);
  const [foundCharactersCoords, setFoundCharactersCoords] = useState([]);
  const { characters } = useContext(waldoContext);
  const [TotCharacters, setTotCharacters] = useState(0);

  // console.log("num ", foundCharactersCoords.length);
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setImgDim({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { settingsData } = useContext(waldoContext);
  let params = useParams();
  let gameid = params.id;
  let id = parseInt(gameid);
  const setting = settingsData[id - 1];

  let tmp = 0;
  characters.map(character => {
    if (character.settingid == setting.settingid) {
      tmp++;
    }
  });
  if (TotCharacters == 0 && tmp != 0) {
    setTotCharacters(tmp);
  }

  const [showSelector, setShowSelector] = useState(false);

  const {loading, message, option, setMessage, setOption} = useFetch(coordx, coordy, imgDim.width, imgDim.height, setting.settingid, characters, setFoundCharactersCoords, setFoundCharsIds);
  
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
    transform: `
      translateY(-${imgDim.height}px)
      ${left ? `translate(-100%, 0) ` : " "}
      ${up ? `translate(0, -100%) ` : " "}
      translate(${coordx + size / 2}px, ${coordy + size / 2}px) 
      ${left ? `translateX(${-size}px) ` : ` `} 
      ${up ? `translateY(${-size}px) ` : ` `}
      `,
  };

  return (
    <div ref={mouseClickRef} onClick={handleClick} className={styles.Image}>
      <img 
        ref={ref}
        src={setting.imglocation} 
        alt="Game scene" 
        className={styles.imgtag}
      />
      {foundCharactersCoords && foundCharactersCoords.length > 0 ? 
        foundCharactersCoords.map((coord, id) => {
          return (
            <PlacePointer 
              key={id}
              coordx={coord.coordx}
              coordy={coord.coordy}
              imgDim={imgDim}
            /> 
          );
        }): 
        null
      }
      {foundCharactersCoords.length == 1 ? 
        <WinDialog 
          time={time}
          setFoundCharactersCoords={setFoundCharactersCoords}
          setFoundCharsIds={setFoundCharsIds}
        /> 
        : null
      }
      {(() => {
        if (loading) {
          return <p>Loading...</p>;
        } else if (message) {
          setTimeout(() => {
            setMessage(null);
          }, 2000);

          return (
            <>
              <p>{message}</p>            
            </> 
          )
        } else {
          return (
            showSelector && 
            <Selector
              style={styleSelector}
              style2={style2}
              className={styles.box}
              setOption={setOption}
              setShowSelector={setShowSelector}
              settingid={setting.settingid}
              foundCharsIds={foundCharsIds}
            />
          );
        }
      })()}
    </div>
  );
}

export default SettingImage;
