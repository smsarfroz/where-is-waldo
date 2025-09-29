import styles from "./GameCard.module.css";
import { Link } from "react-router-dom";

const GameCard = ({setting}) => {
    return (
        <Link to={`/games/${setting.id}`}>
            <div className={styles.gameCard} style={{backgroundImage: `url(${setting.imglocation})`, objectFit: 'cover'}}>
                <p className={styles.gameTitle}>{setting.name}</p>
                <p className={styles.gameDifficulty}>{setting.difficulty}</p>
            </div>
        </Link>
    )
};

export default GameCard;