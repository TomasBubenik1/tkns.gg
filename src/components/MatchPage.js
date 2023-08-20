import { Route, Routes } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { db } from '../firebase-config';
import { addDoc, collection,} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getMatches } from '../services/MatchService';

function MatchPage() {




  const matchCollectionRef = collection(db, "matches");
  const { matchId } = useParams();
  const [matches,setMatches] = useState([]);
  
  
 
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
      <h1>Match Details</h1>
      <p>Match ID: {matchId}</p>
      <div>{matches.map((match)=>{
        if (matchId==match.id){
          return(
            <div key={match.id}>
            <p>{match.matchplayers}</p>
            <p>{match.matchtype}</p>
            <p>{match.region}</p>
            </div>
          )
        }
      })}</div>
    </div>
    
  );
}

export default MatchPage;