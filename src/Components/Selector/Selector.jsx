import { SiCodesandbox } from "react-icons/si";
import styles from './Selector.module.css';
import { waldoContext } from "../../waldoContext";
import { useContext, useEffect } from "react";
import { useState } from "react";

const Selector = ({style, style2, setOption, setShowSelector, settingid, foundCharsIds, foundCharactersCoords, coordx, coordy}) => {
    const { characters } = useContext(waldoContext);
    const [isMarkerBeneath, setIsMarkerBeneath] = useState(false);
    // console.log("coords ", coordx, coordy);
    // console.log(foundCharactersCoords);

    useEffect(() => {
        const isBeneath = foundCharactersCoords.some(coord => {
            const distanceSq = (coord.coordx - coordx) * (coord.coordx - coordx) + (coord.coordy - coordy) * (coord.coordy - coordy);
            // console.log("distance ", coord, coordx, coordy, distanceSq);
            return distanceSq <= 200;
        });
        setIsMarkerBeneath(isBeneath);
    }, [foundCharactersCoords, coordx, coordy]);
    
    function handleClick(e) {
        setOption(e.target.dataset.value);
        e.stopPropagation();
        setShowSelector(false);
    }

    return (
        <>
            {isMarkerBeneath ? null: 
                <>
                    <SiCodesandbox style={style} size={20} className={styles.box}/>
                    
                    <div className={styles.dropdown} style={style2}>
                        {
                            characters.map(character => {
                                if (character.settingid == settingid && !foundCharsIds.includes(character.charid)) {
                                    return (
                                        <div key={character.id}>
                                            <div className={styles.option} onClick={handleClick} data-value={character.charname}>{character.charname}</div>
                                            <hr/>
                                        </div>
                                    );
                                }
                            })
                        }
                        <div className={styles.option} onClick={handleClick} data-value="Cancel">Cancel</div>
                    </div>    
                </>
            }
        </>
    )
};

export default Selector;