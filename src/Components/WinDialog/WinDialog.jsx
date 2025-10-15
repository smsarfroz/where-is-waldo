import styles from './WinDialog.module.css';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const WinDialog = ({time, setFoundCharactersCoords, setFoundCharsIds}) => {
    const navigate = useNavigate();
    const minute = time.minute;
    const second = time.second;
    function handleCancel() {
        setFoundCharactersCoords([]);
        setFoundCharsIds([]);
        navigate('/games');
    }
    
    return (
        <div className={styles.winDialog}>
            <h1 className={styles.text}>
                you won lol
            </h1>
            <MdOutlineCancel size={30} className={styles.cancelButton} onClick={handleCancel}/>

            <p>You took {minute <= 9 ? 0: null}{minute}:{second <= 9 ? 0: null}{second}</p>
        </div>
    );
};

export default WinDialog;