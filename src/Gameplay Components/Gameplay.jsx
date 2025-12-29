import styles from "./gameplay.module.css";
import { Link } from "react-router-dom";

// import { useState, useEffect } from "react";
// import { ItemContext } from "../ItemContext";
// import { useContext } from "react";
// const apiUrl = import.meta.env.VITE_BLOG_API_URL;

const Gameplay = () => {
  // const {
  //   auth,
  //   comments,
  //   id,
  //   posts,
  //   account,
  //   addComment,
  //   profiles,
  //   changeComment,
  //   deleteComment,
  // } = useContext(ItemContext);

  return (
    <div className={styles.gameplay}>
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

export default Gameplay;
