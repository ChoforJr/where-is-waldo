import styles from "./help.module.css";
import { Link } from "react-router-dom";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ItemContext } from "../ItemContext";
// import { useContext } from "react";
// const apiUrl = import.meta.env.VITE_BLOG_API_URL;

const Help = () => {
  // const { setAuth } = useContext(ItemContext);
  // const navigate = useNavigate();

  return (
    <div className={styles.help}>
      <Link to="/">
        <h1>
          WELCOME TO
          <br />
          WHERE'S WALDO?
          <br />
          ENTER
        </h1>
      </Link>
    </div>
  );
};

export default Help;
