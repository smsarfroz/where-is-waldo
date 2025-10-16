import { useState } from 'react';
import styles from './WinDialog.module.css';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const WinDialog = ({time, setFoundCharactersCoords, setFoundCharsIds}) => {
    const navigate = useNavigate();
    const minute = time.minute;
    const second = time.second;
    const [name, setName] = useState("");
    function handleCancel() {
        setFoundCharactersCoords([]);
        setFoundCharsIds([]);
        navigate('/games');
    }
    function handleClick(e) {
        e.preventDefault();
    }
    function handleChange(e) {
        setName(e.target.value);
    }
    return (
        <div className={styles.winDialog} onClick={handleClick}>
            {/* <div className={styles.container1}> */}
                <div className={styles.winTextContainer}>
                    <h1 className={styles.text}>
                        You won!
                    </h1>
                    <p>You found all characters in {minute <= 9 ? 0: null}{minute}:{second <= 9 ? 0: null}{second}</p>
                </div>
                
                <MdOutlineCancel size={30} className={styles.cancelButton} onClick={handleCancel}/>
            {/* </div> */}
            <p>Submit your time!</p>
            <p>Required</p>
            <i>(Only letters and numbers between 3-30 characters)</i>

            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' value={name} onChange={handleChange}/>
                <button type='submit'>submit</button>
            </form>
        </div>
    );
};

export default WinDialog;