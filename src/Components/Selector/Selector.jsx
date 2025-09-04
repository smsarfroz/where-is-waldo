import { SiCodesandbox } from "react-icons/si";
import styles from './Selector.module.css';

const Selector = ({style}) => {

    return (
        <>
            <SiCodesandbox style={style}/>
            
            {/* <div className={styles.dropdown}>
                <div className={styles.option}>Waldo</div>
                <div className={styles.option}>Wilma</div>
                <div className={styles.option}>Wizard</div>
                <div className={styles.option}>Cancel</div>
            </div> */}

        </>
    )
};

export default Selector;