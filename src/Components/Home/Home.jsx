import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className={styles.Home}>
            <div className={styles.Container}>
                <div className={styles.line}>
                    <p className={styles.title}>Welcome to "Where's Waldo" game</p>
                    <p className={styles.passage}>Find Waldo, friends and many other characters in challenging scenes.</p>

                    <div className={styles.rulesContainer}>
                        <p className={styles.rulesTitle}>Rules</p>
                        <ol>
                            <li>Choose a game setting</li>
                            <li>Find all the characters in the list</li>
                            <li>Be fast! Quickest one will be on top of the leaderboard</li>
                        </ol>
                    </div>
                    
                    <Link to='/games'>
                        <button className={styles.playButton}>Play Now</button>
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default Home;