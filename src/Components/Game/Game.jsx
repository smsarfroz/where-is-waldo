import { useContext, useEffect, useState } from "react";
import styles from "./Game.module.css";
import { waldoContext } from "../../waldoContext.js";
import { Navigate, useParams } from "react-router-dom";
import SettingImage from "../SettingImage/SettingImage.jsx";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';

const Game = () => {
    const navigate = useNavigate();
    const [isGameStarted, setisGameStarted] = useState(false);
    const { settingsData } = useContext(waldoContext);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        const x = setInterval(() => {
            setSeconds((prev) => {
                if (prev === 59) {
                    return 0;
                } else {
                    return prev + 1;
                }
            });

        }, 1000);

        return () => clearInterval(x);
    }, []); 

    useEffect(() => {
        if (seconds == 59) setMinutes(prev => prev + 1);
    }, [seconds]);

    let params = useParams();
    let gameid = params.id;
    let id = parseInt(gameid);
    const setting = settingsData[id - 1];
    // console.log("settings ", settingsData);

    // console.log(`${VITE_BASE_URL}/${setting.imglocation}`);
    
    // console.log("minutes, seconds", minutes, seconds);

    // const absolutePath = `${VITE_BASE_URL}/${setting.imglocation}`;
    const style = {
        backgroundImage: `url(${setting.imglocation})`,
        objectFit: 'cover',
    }
    function handleClick() {
        setSeconds(0);
        setMinutes(0);
        setisGameStarted(true);
    }
    function handleCancel() {
        navigate(`/games`);
    }

    return (
        <>
            {
                !isGameStarted ? (
                    <div className={styles.gameUnstarted} style={style}>
                        <p className="gameTitle">{setting.name}</p>
                        <button onClick={handleClick} className={styles.startButton}>Start Game</button>
                    </div>
                ) : (
                    <div className={styles.gamePage}>
                        <div className={styles.stickyBanner}>
                            <div className="Timer">
                                <h1>Timer</h1>
                                <p>{minutes}:{seconds}</p>
                            </div>

                            <div className="findIcons">
                                <h1>Can you find them?</h1>
                                <div className="icons">
                                </div>
                            </div>

                            <MdOutlineCancel size={50} className={styles.cancelButton} onClick={handleCancel}/>
                        </div>

                        <div className={styles.gameImage}>
                            <SettingImage />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Game; 