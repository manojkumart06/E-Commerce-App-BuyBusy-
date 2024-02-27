// Create a new component for the landing page
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";

function LandingPage() {
  return (
    <header>
      <div className={styles.logo_wrapper1}>
       
      </div>
      <div className={styles.logo_wrapper2}>
       
      </div>

      <section className={styles.content}>
        <h1>Welcome to<br />Retail Paradise!</h1>
        <p>Discover amazing products!</p>
       <Link to="/home"><button className={styles.btn}>Shop Now 🔰</button></Link>
       
      </section>
    </header>
  );
}

export default LandingPage;
