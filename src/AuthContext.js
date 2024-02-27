import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";

import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//createed contextAPI for authentication 
export const authContext = createContext();

//custom hook to return Auth values
export function useAuthValue(){
    const value = useContext(authContext);
    return value;
}


//custom context Provider
export function AuthContext({children}){


    const [userList,setUserList]=useState([]);
    const [isLoggedIn,setLoggedIn]=useState(false);
    const [userLoggedIn,setUserLoggedIn]=useState(null);

    // getting all the users from data base on first render of page
    useEffect(()=>{
        const unsub = onSnapshot(collection(db, "BuyBusy"), (snapShot) => {
            const users = snapShot.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            });
            setUserList(users);
        });
    },[isLoggedIn]);
    

    // creating new user
    async function createUser(data){
        // checking whether the email address already in use or not
        const index =userList.findIndex((user) => user.email === data.email);

        if(index !== -1){
            toast.error("Email Address already exist, Try Again or SignIn Instead!!!");
            return;
        }

        // if email not found create new user 
        const docRef =await addDoc(collection(db, "BuyBusy"), {
            name:data.name,
            email:data.email,
            password:data.password,
            cart:[],
            orders:[]
        });
        toast.success("User Created, Please SignIn to Continue!!");
    }


    // sign IN user 
    async function signIn(data){
       
        const index = userList.findIndex((user) => user.email === data.email);

        if(index === -1){
            toast.error("Email doesn't exist, You need to SignUp Instead!!!");
            return false;
        }
        
        // if email found in database then match password
        if(userList[index].password === data.password){
            toast.success("Hurray Sign-In Successfull!!");
            setLoggedIn(true);
            setUserLoggedIn(userList[index]);
            // generating user's login token and store user's data 
            window.localStorage.setItem("token",true);
            window.localStorage.setItem("index",JSON.stringify(userList[index]));
            return true;
        }
        else{
            // if password doesn't match in database
            toast.error("Wrong UserName/Password, Try Again");
            return false;
        }
    }

    // signout function 
    function signOut(){

        // removing user' data and token from local storage
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
        setLoggedIn(false);
        setUserLoggedIn(null);
        toast.success("Sign Out Successfully!!");
    }

    async function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, googleAuthProvider);
            setLoggedIn(true); // Set isLoggedIn to true upon successful sign-in
            return true; // Return true to indicate successful sign-in
        } catch (error) {
            console.log(error.message);
            // Handle sign-in error here, if needed
            return false; // Return false to indicate sign-in failure
        }
    }
    
    

    return(
        <>
            <authContext.Provider value={
                {createUser,
                isLoggedIn,
                setLoggedIn,
                signIn,
                userLoggedIn,
                setUserLoggedIn,
                signOut,
                googleSignIn}
            }>
                <ToastContainer />
                {children}                  
            </authContext.Provider>
        </>
    );
}