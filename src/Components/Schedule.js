import { IconButton } from "@mui/material";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "./styles/Schedule.css";
import { useState } from "react";

function Schedule(props) {
  const [activeEdit, setActiveEdit] = useState("");
  const [textfield1, setTextfield1] = useState(0);
  const [textfield2, setTextfield2] = useState(0);

  function handleTF1change(e) {
    setTextfield1(e.target.value);
  }

  function handleTF2change(e) {
    setTextfield2(e.target.value);
  }

  function comp(team1, team2) {
    if (team1.score > team2.score) return -1;
    if (team1.score < team2.score) return 1;
    if (team1.score === team2.score) {
      if (team1.difference > team2.difference) return -1;
      if (team1.difference < team2.difference) return 1;
    }
    return 0;
  }

  function addResult(team1, team2) {
    let indexT1 = null;
    let indexT2 = null;

    for (let i = 0; i < props.activeEvent.teams.length; i++) {
      if (props.activeEvent.teams[i].name === team1) indexT1 = i;
      if (props.activeEvent.teams[i].name === team2) indexT2 = i;
    }
    if (indexT1 === null || indexT2 === null) return;

    let arr = props.eventArr;
    let eventIndex = null;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === props.activeEvent.name) {
        eventIndex = i;
        continue;
      }
    }

    for (let i = 0; i < arr[eventIndex].games.length; i++) {
      if (
        team1 === arr[eventIndex].games[i][0] &&
        team2 === arr[eventIndex].games[i][1]
      ) {
        arr[eventIndex].games[i][2] = textfield1;
        arr[eventIndex].games[i][3] = textfield2;
      }
    }

    let gamesT1 = 0;
    let gamesT2 = 0;
    let scoreT1 = 0;
    let scoreT2 = 0;
    let difT1 = 0;
    let difT2 = 0;
    let t1 = arr[eventIndex].teams[indexT1];
    let t2 = arr[eventIndex].teams[indexT2];

    for (let i = 0; i < arr[eventIndex].games.length; i++) {
      if (
        arr[eventIndex].games[i][2] !== undefined &&
        arr[eventIndex].games[i][3] !== undefined
      ) {
        // Games
        if (
          arr[eventIndex].games[i][0] === t1.name ||
          arr[eventIndex].games[i][1] === t1.name
        ) {
          gamesT1++;
        }
        if (
          arr[eventIndex].games[i][0] === t2.name ||
          arr[eventIndex].games[i][1] === t2.name
        ) {
          gamesT2++;
        }
        // Score
        if (arr[eventIndex].games[i][0] === t1.name) {
          difT1 =
            parseInt(difT1) +
            parseInt(arr[eventIndex].games[i][2]) -
            parseInt(arr[eventIndex].games[i][3]);
          if (arr[eventIndex].games[i][2] > arr[eventIndex].games[i][3]) {
            scoreT1 = scoreT1 + 3;
          } else if (
            arr[eventIndex].games[i][2] === arr[eventIndex].games[i][3]
          ) {
            scoreT1++;
          }
        }
        if (arr[eventIndex].games[i][1] === t1.name) {
          difT1 =
            parseInt(difT1) -
            parseInt(arr[eventIndex].games[i][2]) +
            parseInt(arr[eventIndex].games[i][3]);
          if (arr[eventIndex].games[i][2] < arr[eventIndex].games[i][3]) {
            scoreT1 = scoreT1 + 3;
          } else if (
            arr[eventIndex].games[i][2] === arr[eventIndex].games[i][3]
          ) {
            scoreT1++;
          }
        }
        if (arr[eventIndex].games[i][0] === t2.name) {
          difT2 =
            parseInt(difT2) +
            parseInt(arr[eventIndex].games[i][2]) -
            parseInt(arr[eventIndex].games[i][3]);
          if (arr[eventIndex].games[i][2] > arr[eventIndex].games[i][3]) {
            scoreT2 = scoreT2 + 3;
          } else if (
            arr[eventIndex].games[i][2] === arr[eventIndex].games[i][3]
          ) {
            scoreT2++;
          }
        }
        if (arr[eventIndex].games[i][1] === t2.name) {
          difT2 =
            parseInt(difT2) -
            parseInt(arr[eventIndex].games[i][2]) +
            parseInt(arr[eventIndex].games[i][3]);
          if (arr[eventIndex].games[i][2] < arr[eventIndex].games[i][3]) {
            scoreT2 = scoreT2 + 3;
          } else if (
            arr[eventIndex].games[i][2] === arr[eventIndex].games[i][3]
          ) {
            scoreT2++;
          }
        }
      }
    }
    t1.score = scoreT1;
    t1.difference = difT1;
    t1.numberGames = gamesT1;
    t2.score = scoreT2;
    t2.difference = difT2;
    t2.numberGames = gamesT2;

    for (let i = 0; i < arr[eventIndex].games.length; i++) {
      if (
        team1 === arr[eventIndex].games[i][0] &&
        team2 === arr[eventIndex].games[i][1]
      ) {
        arr[eventIndex].games[i][2] = textfield1;
        arr[eventIndex].games[i][3] = textfield2;
      }
    }

    arr[eventIndex].teams[indexT1] = t1;
    arr[eventIndex].teams[indexT2] = t2;

    arr[eventIndex].teams.sort(comp);
    props.setEventArr(arr);
    localStorage.setItem("eventArr", JSON.stringify(arr));
    setTextfield1(0);
    setTextfield2(0);
    setActiveEdit("");
    props.rend();
  }

  return (
    <div>
      <h4>Spielplan</h4>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%" }}>Team 1</div>
        <div style={{ width: "30%" }}>Team 2</div>
        <div style={{ width: "15%" }}>Punkte Team 1</div>
        <div style={{ width: "15%" }}>Punkte Team 2</div>
        <div style={{ width: "10%" }}></div>
      </div>

      <ul className="u-List">
        {props.activeEvent.games.map((e) => (
          <li key={e[0] + e[1]} style={{ display: "flex" }}>
            <div style={{ width: "28%", padding: "1%" }}>{e[0]}</div>
            <div style={{ width: "28%", padding: "1%" }}>{e[1]}</div>

            {!(activeEdit === e[0] + e[1]) && (
              <div>
                <TextField
                  size="small"
                  value={e[2]}
                  style={{ width: "35%", paddingRight: "2%" }}
                ></TextField>
                <TextField
                  value={e[3]}
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                ></TextField>
                <IconButton onClick={() => setActiveEdit(e[0] + e[1])}>
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            )}
            {activeEdit === e[0] + e[1] && (
              <div>
                <TextField
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                  onChange={handleTF1change}
                ></TextField>
                <TextField
                  size="small"
                  style={{ width: "35%", paddingRight: "2%" }}
                  onChange={handleTF2change}
                ></TextField>
                <IconButton onClick={() => addResult(e[0], e[1])}>
                  <CheckIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
