import styles from "./help.module.css";
import { ScrollText, PersonStanding } from "lucide-react";

const Help = () => {
  return (
    <div className={styles.help}>
      <section className={styles.gameRules}>
        <h2>
          <ScrollText />
          Game Rules
        </h2>
        <ol>
          <li>Choose a Level</li>
          <p>
            Select any board you want to play. Each board contains a different
            set of characters to find.
          </p>
          <li>Start the Round</li>
          <p>As soon as the board loads, the timer begins. Stay focused!</p>
          <li>Find the Characters</li>
          <p>
            Click on the character you found to open the targeting menu, then
            select the <br /> character you think you've found.
          </p>
          <li>Confirm Your Guess</li>
          <p>The game checks your selection.</p>
          <ul>
            <li>If you're correct, the character is marked as found.</li>
            <li>If you're wrong, keep searching!</li>
          </ul>
          <li>Complete the Board</li>
          <p>Once you find all characters, your time is recorded.</p>
          <li>Enter Your Name</li>
          <p>
            After finishing the round, submit your name to save your score on
            the <br /> leaderboard for that board.
          </p>
        </ol>
        <a href="http://en.wikipedia.org/wiki/Where's_Wally%3F" target="_blank">
          Learn more here
        </a>
      </section>
      <section>
        <h2>
          <PersonStanding />
          Characters
        </h2>
        <div className={styles.gameCharacters}>
          <div>
            <h2>Waldo</h2>
            <img src="/characters/Waldo_n4wodu.webp" alt="Waldo" />
          </div>
          <div>
            <h2>Odlaw</h2>
            <img src="/characters/Odlaw_f8nu7f.webp" alt="Odlaw" />
          </div>
          <div>
            <h2>Wilma</h2>
            <img src="/characters/Wilma_ob7q1b.webp" alt="Wilma" />
          </div>
          <div>
            <h2>Wizard</h2>
            <img src="/characters/Wizard_jvxa8d.webp" alt="Wizard" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
