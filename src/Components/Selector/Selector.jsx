import { SiCodesandbox } from "react-icons/si";
import styles from './Selector.module.css';

const Selector = ({style, style2}) => {

    return (
        <>
            <SiCodesandbox style={style} size={20} className={styles.box}/>
            
            <div className={styles.dropdown} style={style2}>
                <div className={styles.option}>Waldo</div>
                <div className={styles.option}>Wilma</div>
                <div className={styles.option}>Wizard</div>
                <div className={styles.option}>Cancel</div>
            </div>

        </>
    )
};

export default Selector;