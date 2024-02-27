
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/signIn.module.css";
import { useAuthValue } from "../AuthContext";
import GoogleButton from "react-google-button";

export function SignIn(){

    const {signIn,googleSignIn}=useAuthValue();

    const navigate=useNavigate();

    const emailRef=useRef();
    const passwordRef=useRef();


    // form submit function
    async function handleSubmit(e){
        e.preventDefault();
        // storing user's data
        const data={
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        // sign in user
        const status=await signIn(data);
        // if user signed in redirect to corresponding page
        if (status) {
            console.log("Navigating to home page");
            navigate("/home");
        } else {
            console.log("Staying on sign-in page due to sign-in failure");
            navigate("/signin");
        }            
    }  
    
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        
          const googleStatus = await googleSignIn();
          console.log("Google sign-in successful");
          if (googleStatus) {
            console.log("Navigating to home page");
            navigate("/");
        } else {
            console.log("Staying on sign-in page due to sign-in failure");
            navigate("/signin");
        }   
 
      };
    


    return(
        // main container of the page
        <div className={styles.container}>
            
            <div className={styles.inputForm}>
                <h1>Sign-In</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" 
                        placeholder="Enter Email" 
                        required
                        ref={emailRef} />

                    <br />
                    <input type="password" 
                        placeholder="Enter Password"
                        required
                        ref={passwordRef} />
                    <br />
                    <button>Submit</button>
                </form>
                <br />
                <div>
                        <GoogleButton  
                            onClick={handleGoogleSignIn}
                        />
                </div>
                <br />
                <span>or &nbsp;</span>
                {/* link for signup page */}
                <NavLink to="/signup">
                    Create New Account
                </NavLink>
            </div>
            
        </div>
    );
}