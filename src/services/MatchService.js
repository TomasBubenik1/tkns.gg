import { db } from "../firebase-config";
import { addDoc, collection, doc, getDocs, onSnapshot, deleteDoc,setDoc} from "firebase/firestore";
import { getUserFromCookies } from '../services/AuthService';

const usersCollectionRef = collection(db, "users");
const matchCollectionRef = collection(db, "matches");
const user = getUserFromCookies();


export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createMatch = async (matchData) => {
  try {
    const newMatchRef = await addDoc(matchCollectionRef, matchData);
    
    const newMatchId = newMatchRef.id;
      
  } catch (error) {
    console.error("Error creating match:", error);
  }
};

export const deleteMatch = async (matchId) => {
  try {
    const matchRef = doc(db, "matches", matchId);
    await deleteDoc(matchRef);
  } catch (error) {
    console.error("Error deleting match:", error);
  }
};

export const getMatches = (callback) => {
  const unsubscribe = onSnapshot(matchCollectionRef, (snapshot) => {
    const matchData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(matchData);
  });
  return unsubscribe;
};

