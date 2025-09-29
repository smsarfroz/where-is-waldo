import { useContext, useState } from "react";
import styles from "./Game.module.css";
import { waldoContext } from "../../waldoContext.js";
import { useParams } from "react-router-dom";
import SettingImage from "../SettingImage/SettingImage.jsx";

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';

const Game = () => {
    const [isGameStarted, setisGameStarted] = useState(false);
    const { settingsData } = useContext(waldoContext);
    let params = useParams();
    let gameid = params.id;
    let id = parseInt(gameid);
    const setting = settingsData[id - 1];
    console.log("settings ", settingsData);

    // console.log(`${VITE_BASE_URL}/${setting.imglocation}`);
    
    const absolutePath = `${VITE_BASE_URL}/${setting.imglocation}`;
    const style = {
        backgroundImage: `url(${absolutePath})`,
        objectFit: 'cover',
    }
    function handleClick() {
        setisGameStarted(true);
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
                            </div>

                            <h1>Can you find them?</h1>
                            <div className="icons">
                            </div>
                            <p>X</p>
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