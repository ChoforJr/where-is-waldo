import { Link } from "react-router-dom";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Link to="/ranking">
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

export default HomePage;
