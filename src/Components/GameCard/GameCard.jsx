import styles from "./GameCard.module.css";
import { Link } from "react-router-dom";

// backgroundImage: `url(${setting.imglocation})`,
const GameCard = ({setting}) => {
    return (
        <Link to={`/games/${setting.id}`}>
            <div className={styles.gameCard} style={{ objectFit: 'cover'}}>
                <img 
                    src={setting.imglocation} 
                    alt="banner" 
                    className={styles.imageCard}
                />
                <p className={styles.gameTitle}>{setting.name}</p>
                <p className={styles.gameDifficulty}>{setting.difficulty}</p>
            </div>
        </Link>
    )
};

export default GameCard;