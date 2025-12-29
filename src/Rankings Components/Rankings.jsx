import styles from "./rankings.module.css";
import { Link } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import { ItemContext } from "../ItemContext";
// import { useContext } from "react";

const Rankings = () => {
  // const { posts, comments } = useContext(ItemContext);
  // const navigate = useNavigate();

  return (
    <div className={styles.rankings}>
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

export default Rankings;
