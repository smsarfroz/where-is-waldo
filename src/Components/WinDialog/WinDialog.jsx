import { useState } from 'react';
import styles from './WinDialog.module.css';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { PiSignatureLight } from "react-icons/pi";
import { AiOutlineSend } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import getErrorMessage from '../../utils/getErrorMessage';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "/api";
const WinDialog = ({time, setFoundCharactersCoords, setFoundCharsIds, settingid, settingName}) => {
    const navigate = useNavigate();
    const minute = time.minute;
    const second = time.second;
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    function handleCancel() {
        setFoundCharactersCoords([]);
        setFoundCharsIds([]);
        navigate('/games');
    }
    function handleClick(e) {
        e.preventDefault();
    }
    function handleChange(e) {
        setUserName(e.target.value);
    }
    async function onSubmit() {

        const api = `${VITE_BASE_URL}/settings/${settingid}/leaderboard`;
        let data = {};
        data["userName"] = userName;
        data["timeTaken"] = `${time.minute <= 9 ? 0: ''}${time.minute}:${time.second <= 9 ? 0: ''}${time.second}`;
        data["settingName"] = settingName;
        
        // console.log("data ", data);
        try {
            console.log("here");
            const response = await fetch(api, {
                mode: 'cors',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data),
            });
            setLoading(true);
            
            console.log("response ", response);
            if (!response.ok) {
                toast.error(getErrorMessage(response.status));
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            console.log("data ", responseData);
            setResponseData(responseData);
        } catch (error) {
            toast.error(getErrorMessage(`There was a problem with fetch operation`));
            console.error(`There was a problem with fetch operation `, error);
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.winDialog} onClick={handleClick}>
            <div className={styles.winTextContainer}>
                <h1 className={styles.text}>
                    You won!
                </h1>
                <p className={styles.foundText}>You found all characters in {minute <= 9 ? 0: null}{minute}:{second <= 9 ? 0: null}{second}</p>
            </div>
            {loading ? 
                <p>loading...</p> : 
                <>
                    {
                        responseData ? 
                        <>
                            <div className={styles.successBanner}>
                                {responseData.message}
                            </div> 

                            <Link to='/leaderboard' className={styles.movetoLink}>Move to Leaderboards</Link>
                        </> :

                        <>
                            <MdOutlineCancel size={30} className={styles.cancelButton} onClick={handleCancel}/>
                            <div className={styles.submitTextContainer}>
                                <p className={styles.submitText}>Submit your time!</p>
                                <i className={styles.required}>Required</i>
                            </div>
                            <i className={styles.instruction}>(Only letters and numbers between 3-30 characters)</i>

                            <form>
                                <PiSignatureLight size={30} className={styles.icon}/>
                                <input type="text" id='name' value={userName} onChange={handleChange} className={styles.nameInput} placeholder='Username'/>
                                <AiOutlineSend size={30} onClick={onSubmit} className={styles.sendIcon}/>
                            </form>
                        </>
                    }
                </>
            }
        </div>
    );
};

export default WinDialog;