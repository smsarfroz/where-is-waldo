import styles from './Leaderboard.module.css';
import { useContext, useState } from 'react';
import { waldoContext } from '../../waldoContext';
import { MdOutlineLeaderboard } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { GrTrophy } from "react-icons/gr";
import { useEffect } from 'react';
import Loading from '../Loading/Loading.jsx';
import ErrorPage from '../../ErrorPage.jsx';

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

        if (!res) {
          throw new Error(`HTTP error! Status: ${Response.status}`);
        } 
        
        const data = await res.json();

        setLeaderboard(data);
        
        setLoading(false);
    
      } catch (error) {
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
    return <Loading />;
    // return <p>Loading...</p>;
  }
  if (error) {
    // console.log("error ", error);
    return <ErrorPage />;
  }
  
  // console.log("Leaderboard ", Leaderboard);
  
  return (
      <div className={styles.leaderboardPage}>
          <div className={styles.title}>
              <GrTrophy size={30}/>
              <h1>Leaderboards</h1>
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
                                              <p>{arr.timeStamp}</p>
                                              {/* <p>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(arr.timeStamp)}</p> */}
                                              <p>{arr.userName}</p>
                                          </div>
                                          <div>
                                              <p>Time</p>
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