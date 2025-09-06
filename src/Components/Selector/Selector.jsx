import { SiCodesandbox } from "react-icons/si";
import styles from './Selector.module.css';

const Selector = ({style, style2, setOption}) => {
    
    function handleClick(e) {
        setOption(e.target.dataset.value);
    }

    return (
        <>
            <SiCodesandbox style={style} size={20} className={styles.box}/>
            
            <div className={styles.dropdown} style={style2}>
                <div className={styles.option} onClick={handleClick} data-value="Waldo">Waldo</div>
                <div className={styles.option} onClick={handleClick} data-value="Wilma">Wilma</div>
                <div className={styles.option} onClick={handleClick} data-value="Wizard">Wizard</div>
                <div className={styles.option} onClick={handleClick} data-value="Cancel">Cancel</div>
            </div>

        </>
    )
};

export default Selector;