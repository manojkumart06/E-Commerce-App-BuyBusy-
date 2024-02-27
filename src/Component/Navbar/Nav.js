
import { useAuthValue } from "../../AuthContext";
import styles from "../../styles/navbar.module.css";
import { Outlet, NavLink } from "react-router-dom";
import homeIcon from "../../Images/house.png";
import logo from "../../Images/favicon.png";
import signInicon from "../../Images/log-in.png";
import signOuticon from "../../Images/logout.png";
import orderIcon from "../../Images/order.png";
import cartIcon from "../../Images/cart.png";


export default function Nav(){
    // user's login status
    const {isLoggedIn,signOut}=useAuthValue();

    return(
        <>
            <div className={styles.navbarContainer}> 
                <div className={styles.navLinks}>
                    <NavLink to="/">
                    <img src = {logo} alt="logo" />
                        <span className= {styles.logo_name}>Buy Busy</span>
                    </NavLink>
                </div>
                <div className={styles.navLinks}>
                    <NavLink to="/">
                            <img src={homeIcon} alt="home-icon" />
                        <span>
                            Home
                        </span>
                    </NavLink>

                    {isLoggedIn && <NavLink to="/myorder">
                    <img  src={orderIcon} alt="order-icon"/>
                        <span>
                            My Order
                        </span>
                    </NavLink> }


                    {/* cart link */}
                    {/* show when user is logged in */}
                    {isLoggedIn && <NavLink to="/cart">
                        <img  src={cartIcon} alt="cart-icon"/>
                        <span>
                            Cart
                        </span>
                    </NavLink> }

                    {/* for signIN and signOut */}
                    <NavLink to={!isLoggedIn?"/signin":"/"}>
                        <span>
                            {!isLoggedIn?
                                <>
                                <img  src={signInicon} alt="signin-icon"/>
                                    SignIn
                                </>
                                :
                                <>
                                    <img  src={signOuticon} alt="signOut-icon"/>
                                    {/* sign out user  */}
                                    <span onClick={signOut}>SignOut</span>
                                </>
                            }
                        </span>
                    </NavLink>
                </div>
            </div>
            {/* render child pages */}
            <Outlet />
        </>
    )
}