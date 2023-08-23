import React, { useState,useRef} from "react";
import { getUserFromCookies } from '../services/AuthService';
import { db } from "../firebase-config";
import { updateDoc,collection, doc} from "@firebase/firestore";
import Cookies from "js-cookie";

const user = getUserFromCookies();
const userCookie = Cookies.get('user');
const userDataCookie = userCookie ? JSON.parse(userCookie) : null;

function ProfileComponent(){


const [newNickName,setNewNickName] = useState('')
const Submit = async () => {
    try {
        const userDocRef = doc(db,'users',user.uid);
        await updateDoc(userDocRef, {
            nickname: newNickName
        });
        userDataCookie.nickname = newNickName;
        Cookies.set('user', JSON.stringify(userDataCookie));
        console.log("Nickname updated successfully!");
    } catch (error) {
        alert("Failed to update nickname. Check console for more information.")
        console.error("Error updating nickname:", error);
    }
};

const change = event => {
    setNewNickName(event.target.value)
}



return(
    <div>
        <div style={{color:"white"}}>
        {user ? <p>{user.username}</p> : <p>User not logged in</p>}
      {user?.nickname ? (
        <p>Current nickname: {user.nickname}</p>
      ) : (
        <p>Current nickname: Not found</p>
      )}
    </div>  
        <div>
            <input type="text" placeholder="New nickname" onChange={change}></input><br></br>
            <button style={{border:"solid white 2px",color:"white"}} onClick={Submit}>Submit</button>
        </div>
        
    </div>
)
}

export default ProfileComponent