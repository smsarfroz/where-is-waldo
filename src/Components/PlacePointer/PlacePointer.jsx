import { useMemo } from "react";
import styles from "./PlacePointer.module.css";
import { LuMapPinCheck } from "react-icons/lu";

const PlacePointer = ({coordx, coordy}) => {

    // console.log("coords ", coordx, coordy);
    // console.log("x ", coordx, (coordx/imgDim.width) * 100);
    // console.log("y ", coordy, (coordy/imgDim.height) * 100);
    const stylePointer = useMemo(() => ({
        position: 'absolute',   
        left: `${coordx}%`,
        top: `${coordy}%`,
        transform: `translate(-50%, -50%)`,
        // left: `${(coordx/imgDim.width) * 100}%`,
        // top: `${(coordy/imgDim.height) * 100}%`,
        willChange: 'transform',
        pointerEvents: 'none',
    }), [coordx, coordy]);
    function handleClick(e) {
        e.preventDefault();
    }

    return (
        <>
            <LuMapPinCheck style={stylePointer} size={30} className={styles.Pointer} onClick={handleClick}/>    
        </>
    )
};

export default PlacePointer;