import { Button } from "@mui/material";
import "./styles/SideDrawer.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  getEventNamesForUser,
  getEventById,
} from "../firebase/firebase-event-api.tsx";

function Sidedrawer(props) {
  const [eventNames, setEventNames] = useState(null);

  useEffect(() => {
    getEventNamesForUser("asd").then((result) => {
      setEventNames(result);
    });
  }, []);

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

  function deleteEvent(name) {
    for (let i = 0; i < props.eventNames.length; i++) {
      if (name === eventNames[i]) {
        console.log("Deleting Event:", eventNames[i]);
        return;
      }
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
              <Button className="ButtonAsH2" onClick={() => deleteEvent(e[0])}>
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
