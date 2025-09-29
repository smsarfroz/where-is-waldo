import { useContext } from "react";
import styles from "./Games.module.css";
import { waldoContext } from "../../waldoContext";
import GameCard from "../GameCard/GameCard";
import { v4 as uuidv4 } from 'uuid';

const Games = () => {
    const { settingsData } = useContext(waldoContext);
    console.log("settingsData ", settingsData);
    return (
        <>
            <h1>Which game would you like to play?</h1>
            
            <div className={styles.gameList}>
                {settingsData.map((setting) => {
                    return (
                        <GameCard
                            setting={setting}
                            key={uuidv4()}
                        />
                    )
                })}
            </div>
        </>
    );
};

export default Games;