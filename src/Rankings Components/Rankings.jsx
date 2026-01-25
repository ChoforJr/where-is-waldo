import styles from "./rankings.module.css";
import { Link } from "react-router-dom";
import { ItemContext } from "../ItemContext";
import { useContext } from "react";

const Rankings = () => {
  const { level, rankings } = useContext(ItemContext);
  return (
    <div className={styles.rankings}>
      <aside>
        <h1>
          <Link to="/ranking/1">Level 1</Link>
        </h1>
        <h1>
          <Link to="/ranking/2">Level 2</Link>
        </h1>
        <h1>
          <Link to="/ranking/3">Level 3</Link>
        </h1>
        <h1>
          <Link to="/ranking/4">Level 4</Link>
        </h1>
      </aside>
      <section>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Time (in seconds)</th>
            </tr>
          </thead>
          <tbody>
            {level == undefined ? (
              <TableRows level={"1"} rankings={rankings} />
            ) : (
              <TableRows level={level} rankings={rankings} />
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Rankings;

function TableRows({ level, rankings }) {
  return (
    <>
      {rankings
        .filter((ranking) => ranking.level == level)
        .sort((a, b) => a.time - b.time)
        .map((rank, index) => (
          <tr key={rank.keyID}>
            <td>{index + 1}</td>
            <td>{rank.player}</td>
            <td>{rank.time}</td>
          </tr>
        ))}
    </>
  );
}
