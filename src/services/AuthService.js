import { db } from "../firebase-config";
import { addDoc, collection, doc, getDocs, onSnapshot, deleteDoc,setDoc,getDoc } from "firebase/firestore";
import { useState,createContext,useContext} from "react";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';




const usersCollectionRef = collection(db, "users");
const googleprovider = new GoogleAuthProvider()
const AuthContext = createContext();


export const getUserFromCookies = () => {
  const userCookie = Cookies.get('user');
  return userCookie ? JSON.parse(userCookie) : null;
};

export function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const userCookie = Cookies.get('user');
  const userData = userCookie ? JSON.parse(userCookie) : null;


     const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleprovider);
    const user = result.user;
    const userDocRef = doc(usersCollectionRef, user.uid);
    const existingData =  await getDoc(userDocRef);
    const existingUserData = existingData.data();


     const userData = {
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      balance: existingUserData && existingUserData.balance ? existingUserData.balance:0,
      nickname: existingUserData && existingUserData.nickname ? existingUserData.nickname: "Default Nick (Change it in profile settings)",
      };
    
      await setDoc(userDocRef, userData);
    setUser(userData);
    
    Cookies.set('user', JSON.stringify(userData));

    console.log("User data stored in Firestore");
  } catch (error) {
    console.log(error);
  }
}
return (
  <AuthContext.Provider value={{ user, signInWithGoogle }}>
    {children}
  </AuthContext.Provider>
);
};

export function useAuth() {
  return useContext(AuthContext);
}