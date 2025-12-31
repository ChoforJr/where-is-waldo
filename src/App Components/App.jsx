import "./App.css";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ItemContext } from "../ItemContext";
import { useAppLogic } from "./UseAppLogic";
import { AlignEndHorizontal, Info } from "lucide-react";

const App = () => {
  const { id } = useAppLogic();

  const value = {
    id,
  };
  return (
    <div className="container">
      <nav>
        <h1>
          <Link to="/">
            <img src="src/assets/logo.webp" alt="logo" width={25} />
            Where's <span style={{ color: "#EE204D" }}>Waldo?</span>{" "}
          </Link>
        </h1>
        <section>
          <Link to="/help">
            <Info size={20} color="#EE204D" /> Help
          </Link>
          <Link to="/ranking">
            <AlignEndHorizontal size={20} color="#EE204D" /> Ranking
          </Link>
        </section>
      </nav>
      <>
        <main>
          <ItemContext.Provider value={value}>
            <Outlet />
          </ItemContext.Provider>
        </main>
      </>
      <footer>
        Made by{" "}
        <a href="https://github.com/ChoforJr/where-is-waldo" target="_blank">
          Chofor Forsakang
        </a>
      </footer>
    </div>
  );
};

export default App;
