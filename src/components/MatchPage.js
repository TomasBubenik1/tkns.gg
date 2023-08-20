import { Route, Routes } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { db } from '../firebase-config';
import { addDoc, collection, doc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import { getMatches } from '../services/MatchService';

const matchCollectionRef = collection(db, "matches");

export const GetMatches = async () => {
  const data = await getDocs(matchCollectionRef);
 
}


function MatchPage() {
  const { matchId } = useParams();
  return (
    <div>
      <h1>Match Details</h1>
      <p>Match ID: {matchId}</p>
      <p></p>
      {/* Display other match details here */}
      <button onClick={getMatches}>AAA</button>
    </div>
    
  );
}

export default MatchPage;