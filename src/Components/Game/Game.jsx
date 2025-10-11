import { useContext, useEffect, useState } from "react";
import styles from "./Game.module.css";
import { waldoContext } from "../../waldoContext.js";
import { Navigate, useParams } from "react-router-dom";
import SettingImage from "../SettingImage/SettingImage.jsx";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';

const Game = () => {
    const navigate = useNavigate();
    const [isGameStarted, setisGameStarted] = useState(false);
    const { settingsData } = useContext(waldoContext);
    const [time, setTime] = useState({minute: 0, second: 0});
    const { characters } = useContext(waldoContext);

    let params = useParams();
    let gameid = params.id;
    let id = parseInt(gameid);
    const setting = settingsData[id - 1];

    useEffect(() => {
        const x = setInterval(() => {
            setTime(prevTime => {
                if (prevTime.second == 59) {
                    return {minute: prevTime.minute + 1, second: 0};
                }
                return {minute: prevTime.minute, second: prevTime.second + 1};
            });

        }, 1000);

        return () => clearInterval(x);
    }, []); 

    const style = {
        backgroundImage: `url(${setting.imglocation})`,
    }
    function handleClick() {
        setTime({minute: 0, second: 0});
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
                        <div className={styles.dimLight}>                        
                            <p className={styles.gameTitle}>{setting.name}</p>
                            <button onClick={handleClick} className={styles.startButton}>Start Game</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.gamePage}>
                        <div className={styles.stickyBanner}>
                            <div className={styles.Timer}>
                                <p className={styles.timerText}>Timer</p>
                                <p className={styles.timeStamp}>
                                    {time.minute <= 9 ? 0: null}{time.minute}:{time.second <= 9 ? 0: null}{time.second}
                                </p>
                            </div>

                            <div className={styles.findIcons}>
                                <p className={styles.Heading}>Can you find them?</p>
                                <div className={styles.icons}>
                                    {
                                        characters.map(character => {
                                            if (character.settingid == setting.settingid) {
                                                return (
                                                    
                                                    <div className={styles.iconDiv} key={uuidv4()}>
                                                        <img 
                                                            src={character.imglocation} 
                                                            alt="icon" 
                                                            className={styles.imgIcon}
                                                        />
                                                        <div className={styles.charname}>
                                                            {character.charname}
                                                        </div>
                                                    </div>
                                                
                                                );
                                            }
                                        })
                                    }
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