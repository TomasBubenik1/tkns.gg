import { Route, Routes } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { db } from '../firebase-config';
import { addDoc, collection,} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getMatches } from '../services/MatchService';
import {AuthProvider} from '../services/AuthService'
import {useAuth} from '../services/AuthService'
import { getUserFromCookies } from '../services/AuthService';
import "./MatchPage.css";

function MatchPage() {




  const matchCollectionRef = collection(db, "matches");
  const { matchId } = useParams();
  const [matches,setMatches] = useState([]);
  const user = getUserFromCookies();

   
  
 
  useEffect(() => {
    const unsubscribe = getMatches((matchData) => {
      setMatches(matchData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1 style={{color:"white"}}>Match Details</h1>
      <p style={{color:"white"}}>Match ID: {matchId}</p>
      <div style={{color:"white"}}>{matches.map((match)=>{
        if (matchId==match.id){
          return(
            <div key={match.id}>
            <p>{match.matchplayers}</p>
            <p>{match.matchtype}</p>
            <p>{match.region}</p>
            <p>{match.group1}</p>
            <p>{match.group2}</p> 
            {user && user.username ? <p>{user.username}</p> : <p>Not Logged in</p> }
            
            </div>
          )
        }
      })}</div>
    </div>
//Use map or for to go through groups and render divs instead of p in future that will make multiple player groups work.
//brightnes 62%
//optimize match page in future
  );
}

export default MatchPage;