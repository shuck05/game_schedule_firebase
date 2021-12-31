import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import MainSpace from "./Components/MainSpace";
import NewEvent from "./Components/NewEvent";
import SideDrawer from "./Components/SideDrawer";
import LoginPage from "./Components/LoginPage";
import NewAccPage from "./Components/NewAccPage";

function App() {
  const [newEntry, setNewEntry] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  function toggleNewEntry() {
    setNewEntry(!newEntry);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <div className="Header">
                  <Header></Header>
                </div>
                <div className="Sidedrawer">
                  <SideDrawer
                    toggleNewEntry={toggleNewEntry}
                    setActiveEvent={setActiveEvent}
                    activeEvent={activeEvent}
                  />
                </div>
                <div className="Main">
                  {!newEntry && <MainSpace activeEvent={activeEvent} />}
                  {newEntry && <NewEvent setNewEntry={setNewEntry} setActiveEvent={setActiveEvent} />}
                </div>
                <div className="Ads">
                  <h2> Hier könnte ihre Werbung stehen</h2>

                  <Button
                    variant="primary"
                    onClick={() => {
                      console.log("Dummy");
                    }}
                  >
                    Dummy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      console.log("Dummy");
                    }}
                  >
                    Clear Storage
                  </Button>
                </div>
              </div>
            }
          />
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="signup" element={<NewAccPage></NewAccPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
