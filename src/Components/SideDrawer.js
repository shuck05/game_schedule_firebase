import { Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./styles/SideDrawer.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  getEventNamesForUser,
  getEventById,
  handleDeleteEventWithID,
} from "../firebase/firebase-event-api.tsx";
import { auth } from "../firebase/FirebaseApp";

function Sidedrawer(props) {
  const [eventNames, setEventNames] = useState(null);

  useEffect(() => {
    console.log("Sidedrawer UseEffect");
    if (auth.currentUser != null) {
      getEventNamesForUser(auth.currentUser.email).then((result) => {
        setEventNames(result);
      });
    }
    // eslint-disable-next-line
  }, [props.newEntry]);

  function toggleNewEntry() {
    props.toggleNewEntry();
  }

  async function setActiveEvent(id) {
    if (props.activeEvent !== null) {
      if (id === props.activeEvent.id) {
        props.setActiveEvent(null);
        return;
      }
    }
    getEventById(id).then((result) => {
      props.setActiveEvent(result);
    });
  }

  function deleteEvent(id) {
    handleDeleteEventWithID(id);
    props.setActiveEvent(null);
  }

  function refresh() {
    if (auth.currentUser != null) {
      getEventNamesForUser(auth.currentUser.email).then((result) => {
        setEventNames(result);
      });
    }
  }

  return (
    <div className="SideDrawer">
      <div className="Sidedrawer-Button">
        <Button className="ButtonAsH2" onClick={toggleNewEntry}>
          Neues Event
        </Button>
      </div>
      <ul className="u-List">
        {eventNames === null ? (
          <h6>Noch keine Events</h6>
        ) : (
          eventNames.map((e) => (
            <li key={e}>
              <Button
                className="ButtonAsH2"
                onClick={() => setActiveEvent(e[1])}
              >
                {e[0]}
              </Button>
              <Button className="ButtonAsH2" onClick={() => deleteEvent(e[1])}>
                X
              </Button>
            </li>
          ))
        )}
      </ul>
      <IconButton onClick={refresh} style={{ color: "white" }}>
        <RefreshIcon />
      </IconButton>
    </div>
  );
}

export default Sidedrawer;
