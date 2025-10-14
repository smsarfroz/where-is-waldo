import styles from "./PlacePointer.module.css";
import { LuMapPinCheck } from "react-icons/lu";

const PlacePointer = ({coordx, coordy}) => {

    const stylePointer = {
        position: 'absolute',
        left: `${coordx}px`,
        top: `${coordy}px`,
        transform: `translate(-50%, -50%)`
    };
    function handleClick(e) {
        e.preventDefault();
        // e.stopPropagation();
    }

    return (
        <>
            <LuMapPinCheck style={stylePointer} size={60} className={styles.Pointer} onClick={handleClick}/>    
        </>
    )
};

export default PlacePointer;