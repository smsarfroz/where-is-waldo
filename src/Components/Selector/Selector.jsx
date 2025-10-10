import { SiCodesandbox } from "react-icons/si";
import styles from './Selector.module.css';
import { waldoContext } from "../../waldoContext";
import { useContext } from "react";

const Selector = ({style, style2, setOption, setShowSelector, gameid}) => {
    const { characters } = useContext(waldoContext);
    function handleClick(e) {
        setOption(e.target.dataset.value);
        e.stopPropagation();
        setShowSelector(false);
    }

    return (
        <>
            <SiCodesandbox style={style} size={20} className={styles.box}/>
            
            <div className={styles.dropdown} style={style2}>
                {
                    characters.map(character => {
                        if (character.settingid == gameid) {
                            return (
                                <div className={styles.option} onClick={handleClick} data-value={character.charname} key={character.id}>{character.charname}</div>
                            );
                        }
                    })
                }
                <div className={styles.option} onClick={handleClick} data-value="Cancel">Cancel</div>
            </div>
        
        </>
    )
};

export default Selector;