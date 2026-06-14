import styles from './Leaderboard.module.css';
import { useContext, useState } from 'react';
import { waldoContext } from '../../waldoContext';
import { MdOutlineLeaderboard } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { GrTrophy } from "react-icons/gr";
import { useEffect } from 'react';
import Loading from '../Loading/Loading.jsx';
import ErrorPage from '../../ErrorPage.jsx';
import { toast } from 'react-toastify';
import getErrorMessage from '../../utils/getErrorMessage.js';

const VITE_BASE_URL =  import.meta.env.VITE_BASE_URL || '/api';
// console.log(VITE_BASE_URL);

const useFetchData = () => {
  const api = `${VITE_BASE_URL}/leaderboard`;
  const [Leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [res] = await Promise.all([
          fetch(api),
        ]); 

        if (!res.ok) {
          toast.error(getErrorMessage(res.status));
          throw new Error(`HTTP error! Status: ${res.status}`);
        } 
        
        const data = await res.json();

        setLeaderboard(data);
        
        setLoading(false);
    
      } catch (error) {
        toast.error(`There was a problem with fetch operation.`);
        setError(error);
      };
    };
    fetchData();
  }, [api]);

  return {loading, error, Leaderboard};
};


const Leaderboard = () => {
  const { loading, error, Leaderboard } = useFetchData();

  if (loading) {
    // return <Loading />;
    return <p className={styles.loadingText}>Loading...</p>;
  }
  if (error) {
    // console.log("error ", error);
    return <ErrorPage />;
  }
  
  // console.log("Leaderboard ", Leaderboard);
  
  return (
      <div className={styles.leaderboardPage}>
          <div className={styles.title}>
              <GrTrophy size={50}/>
              <p className={styles.titleName}>Leaderboards</p>
          </div>
          {
              Leaderboard.map((board, i) => {
                  return (<div className={styles.table} key={i}>
                      
                      <div className={styles.heading}>
                          <MdOutlineLeaderboard size={45}/>
                          <div className={styles.verticalLine}>
                              <p className={styles.settingName}>{board.name}</p>
                          </div>
                      </div>
                      {
                          board.array.map((arr, i) => {
                              return (
                                  <div key={i}>
                                      <hr className={styles.horizontalLine}/>
                                      <div className={styles.row}>
                                          <CiUser size={42}/>
                                          <div>
                                              {/* <p className={styles.timeStamp}>{arr.timeStamp}</p> */}
                                              <p className={styles.timeStamp}>{new Date(arr.timeStamp).toLocaleString("en-US",
                                                {
                                                  month: "short",
                                                  day: "2-digit",
                                                  year: "numeric",
                                                  hour: '2-digit',
                                                  minute: '2-digit'
                                                })}
                                              </p>
                                              <p>{arr.userName}</p>
                                          </div>
                                          <div>
                                              <b>Time</b>
                                              <p>{arr.timeTaken}</p>
                                          </div>
                                      </div>
                                  </div>
                              )
                          })
                      }
                  </div>
                  )
              })
          }
      </div>
  )
};

export default Leaderboard;