import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import MainSpace from "./Components/MainSpace";
import NewEvent from "./Components/NewEvent";
import SideDrawer from "./Components/SideDrawer";
import LoginPage from "./Components/LoginPage";

const dummyData = [
  {
    name: "VBT",
    teams: [
      {
        name: "EstA",
        score: 0,
        numberGames: 0,
        difference: 0,
      },
      {
        name: "Talf",
        score: 0,
        numberGames: 0,
        difference: 0,
      },
      {
        name: "Splif",
        score: 0,
        numberGames: 0,
        difference: 0,
      },
    ],
    games: [
      ["EstA", "Talf", undefined, undefined],
      ["Talf", "Splif", undefined, undefined],
      ["Splif", "EstA", undefined, undefined],
    ],
    participants: ["Timmi Hendrix", "Benjamin"],
    trainer: ["2 Pac", "50 Cent"],
  },
  {
    name: "Revival",
    teams: [
      {
        name: "Unknown4",
        score: 0,
        numberGames: 0,
        difference: 0,
      },
      {
        name: "Allstars",
        score: 0,
        numberGames: 0,
        difference: 0,
      },
      {
        name: "Tribe of Beni",
        score: 0,
        numberGames: 0,
        difference: 0,
      },
    ],
    games: [
      ["Unknown4", "Allstars", undefined, undefined],
      ["Allstars", "Tribe of Beni", undefined, undefined],
      ["Tribe of Beni", "Unknown4", undefined, undefined],
    ],
    participants: ["Timmi Hendrix", "Benjamin"],
    trainer: ["2 Pac", "50 Cent"],
  },
];

function App() {
  useEffect(() => {});
  const [userID, setUserID] = useState(null);
  const [newEntry, setNewEntry] = useState(false);
  const [eventArr, setEventArr] = useState(
    JSON.parse(localStorage.getItem("eventArr"))
  );
  const [activeEvent, setActiveEvent] = useState(null);

  function toggleNewEntry() {
    setNewEntry(!newEntry);
  }

  function dummy() {
    setEventArr(dummyData);
    localStorage.setItem("eventArr", JSON.stringify(dummyData));
  }

  function dummy2() {
    setEventArr([]);
    localStorage.clear();
    // window.location.reload(false);
  }

  return (
    <div>
      {userID === null && <LoginPage setUserID={setUserID}></LoginPage>}
      {userID !== null && (
        <div className="App">
          <div className="Header">
            <Header setUserID={setUserID}></Header>
          </div>
          <div className="Sidedrawer">
            <SideDrawer
              toggleNewEntry={toggleNewEntry}
              setActiveEvent={setActiveEvent}
              activeEvent={activeEvent}
              setEventArr={setEventArr}
              eventArr={eventArr}
            ></SideDrawer>
          </div>
          <div className="Main">
            {!newEntry && (
              <MainSpace
                activeEvent={activeEvent}
                setEventArr={setEventArr}
                eventArr={eventArr}
              ></MainSpace>
            )}
            {newEntry && (
              <NewEvent
                setNewEntry={setNewEntry}
                setEventArr={setEventArr}
                eventArr={eventArr}
              ></NewEvent>
            )}
          </div>
          <div className="Ads">
            <h2> Hier könnte ihre Werbung stehen</h2>

            <Button variant="primary" onClick={dummy}>
              Dummy
            </Button>
            <Button variant="primary" onClick={dummy2}>
              Clear Storage
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
