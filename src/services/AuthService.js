import { db } from "../firebase-config";
import { addDoc, collection, doc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import {  auth } from '../firebase-config';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";



const usersCollectionRef = collection(db, "users");
const googleprovider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const userData = {
        email: result.user.email,
        username: result.user.displayName   
      };
     await  addDoc(usersCollectionRef, userData);
    } catch (error) {
      console.log(error);
    }
  };

  