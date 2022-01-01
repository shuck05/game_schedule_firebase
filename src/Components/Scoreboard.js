import { Button } from "@mui/material";
import "./styles/Scoreboard.css";

function Scoreboard(props) {
  return (
    <div>
      {props.activeEvent === null ? (
        <div>Sachen</div>
      ) : (
        <div>
          <h4>Tabelle</h4>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>TeamName</div>
            <div style={{ width: "15%" }}>Anzahl Spiele </div>
            <div style={{ width: "15%" }}>Differenz</div>
            <div style={{ width: "20%" }}>Punkte</div>
          </div>

          <ul className="u-List">
            {props.activeEvent.teams.map((e) => (
              <li key={e.name}>
                <Button className="ButtonAsH2 Width50">{e.name}</Button>
                <Button className="ButtonAsH2 Width15">{e.numberGames}</Button>
                <Button className="ButtonAsH2 Width15">{e.dif}</Button>
                <Button className="ButtonAsH2 Width20">{e.score}</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Scoreboard;
