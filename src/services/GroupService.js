import { db } from "../firebase-config";
import { addDoc, collection, doc, getDocs, onSnapshot, deleteDoc,setDoc,getDoc,updateDoc } from "firebase/firestore";
import { useState,createContext,useContext} from "react";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';
import { getUserFromCookies } from "./AuthService";

const user = getUserFromCookies();


const userCookie = Cookies.get('user');
const usersCollectionRef = collection(db, "users");
const googleprovider = new GoogleAuthProvider()
const AuthContext = createContext();





export const createNewGroup = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const newGroupData = {
        player1: user.nickname,
        player2: null,
        player3: null,
        player4: null
      };


    const userRef = doc(db, "users", user.uid);
    try {
        await updateDoc(userDocRef, { group: newGroupData });
        console.log("Group data added to user's document successfully");
      } catch (error) {
        console.error("Error adding group data to user's document:", error);
      }
    }
export default createNewGroup;