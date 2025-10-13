import styles from "./PlacePointer.module.css";
import { LuMapPinCheck } from "react-icons/lu";

const PlacePointer = ({coordx, coordy}) => {

    const stylePointer = {
        position: 'absolute',
        left: `${coordx}px`,
        top: `${coordy}px`,
        transform: `translate(-50%, -50%)`
    };

    return (
        <>
            <LuMapPinCheck style={stylePointer} size={30} className={styles.Pointer}/>    
        </>
    )
};

export default PlacePointer;