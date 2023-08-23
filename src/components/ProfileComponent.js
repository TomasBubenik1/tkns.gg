import React, { useState,useRef} from "react";
import { getUserFromCookies } from '../services/AuthService';
import { db } from "../firebase-config";
import { updateDoc,collection, doc} from "@firebase/firestore";


const user = getUserFromCookies();


export function UserComponent(){

    console.log(user.nickname)

const [newNickName,setNewNickName] = useState('')
const Submit = async () => {
    try {
        const userDocRef = doc(db,'users',user.uid);
        await updateDoc(userDocRef, {
            nickname: newNickName
        });

        console.log("Nickname updated successfully!");
    } catch (error) {
        console.error("Error updating nickname:", error);
    }
};

const change = event => {
    setNewNickName(event.target.value)
}



return(
    <div>
        <div style={{color:"white"}}>
            <p>{user.username}</p>
            {user.nickname ? <p>Current nickname: {user.nickname}</p> : <p>Current nickname: Not found</p>}
        </div>

        <div>
            <input type="text" placeholder="New nickname" onChange={change}></input><br></br>
            <button style={{border:"solid white 2px",color:"white"}} onClick={Submit}>Submit</button>
        </div>
        
    </div>
)


}