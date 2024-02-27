
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


// render error page
export function Error(){
    const navigate=useNavigate();

    // Redirect to homepage after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        // Cleanup function to clear the timeout if the component unmounts before the timeout is completed
        return () => clearTimeout(timer);
    }, [navigate]); // Adding navigate to the dependency array


    return(
        // Error message on screen
        <div style={{textAlign:"center"}}>
            <h1>Error, Something went wrong !!!</h1>
            <p>redirecting back to homepage... </p>
        </div>

    )
}