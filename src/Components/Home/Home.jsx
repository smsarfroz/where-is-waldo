import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.Home}>
            {/* <h1>Home Page</h1> */}
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

                    <button className={styles.playButton}>Play Now</button>
                </div>
            </div>
        </div>
    );
};

export default Home;