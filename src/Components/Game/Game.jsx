import { useContext, useEffect, useState } from "react";
import styles from "./Game.module.css";
import { waldoContext } from "../../waldoContext.js";
import { Navigate, useParams } from "react-router-dom";
import SettingImage from "../SettingImage/SettingImage.jsx";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkDone } from "react-icons/io5";

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';

const Game = () => {
    const navigate = useNavigate();
    const [isGameStarted, setisGameStarted] = useState(false);
    const { settingsData } = useContext(waldoContext);
    const [time, setTime] = useState({minute: 0, second: 0});
    const { characters } = useContext(waldoContext);
    // console.log('characters', characters);
    const [foundCharsIds, setFoundCharsIds] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    let params = useParams();
    let gameid = params.id;
    let id = parseInt(gameid);
    const setting = settingsData[id - 1];
    const settingid = setting.settingid;

    useEffect(() => {
        if (!gameOver) {
            const x = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime.second == 59) {
                        return {minute: prevTime.minute + 1, second: 0};
                    }
                    return {minute: prevTime.minute, second: prevTime.second + 1};
                });

            }, 1000);

            return () => clearInterval(x);
        }
    }, [gameOver]); 

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
    const doneStyle = {
        border: '3px solid rgba(25, 199, 103, 1)',
    };

    const credits = () => {
        switch(settingid) {
            case 1: 
                return {name: 'Gio Calistro', link: 'https://www.reddit.com/r/wimmelbilder/comments/1dexkvw/inspired_by_ancient_greece_and_mythology_by_me/'};
            case 2:
                return {name: 'By Zurgetron', link: 'https://www.reddit.com/r/wimmelbilder/comments/1kuje3y/sinister_citadel_digital_by_me/#lightbox'};
            case 3:
                return {name: 'Darrow Pinup', link: 'https://www.reddit.com/r/wimmelbilder/comments/1m9bkds/geof_darrow_pinup_in_the_simpsons_tree_house_of/'};
            case 4:
                return {name: 'sara', link: 'https://imgur.com/gallery/lets-play-some-wheres-waldo-8exqx'}
            default: 
                return {name: 'author', link: ''};
        }
    };
    const credit = credits();

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
                                                    
                                                    <div className={styles.iconDiv} key={character.id}>
                                                        <img 
                                                            src={character.imglocation} 
                                                            alt="icon" 
                                                            className={styles.imgIcon}
                                                            style={foundCharsIds.includes(character.charid) ? doneStyle: null}
                                                        />
                                                        {foundCharsIds.includes(character.charid) ? <IoCheckmarkDone size={40} className={styles.checkmark}/> : null}
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
                            <SettingImage 
                                foundCharsIds={foundCharsIds}
                                setFoundCharsIds = {setFoundCharsIds}
                                time={time}
                                gameOver={gameOver}
                                setGameOver={setGameOver}
                            />
                            <figcaption style={{ fontSize: '0.85rem', color: '#666' }}>
                                Photo by <a href={credit.link} target="_blank" rel="noreferrer">{credit.name}</a> on {settingid == 4 ? 'imgur': 'Reddit'}.
                            </figcaption>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Game; 