import { Button } from "@mui/material";
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
    if (auth.currentUser != null) {
      getEventNamesForUser(auth.currentUser.email).then((result) => {
        setEventNames(result);
      });
    }
    // eslint-disable-next-line
  }, [props.toggleNewEntry, props.activeEvent]);

  function toggleNewEntry() {
    props.toggleNewEntry();
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
    </div>
  );
}

export default Sidedrawer;
