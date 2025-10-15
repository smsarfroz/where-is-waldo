import styles from "./PlacePointer.module.css";
import { LuMapPinCheck } from "react-icons/lu";

const PlacePointer = ({coordx, coordy, imgDim}) => {

    const stylePointer = {
        position: 'absolute',
        left: `${(coordx/imgDim.width) * 100}%`,
        top: `${(coordy/imgDim.height) * 100}%`,
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