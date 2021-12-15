import { Button } from "@mui/material";
import "./styles/SideDrawer.css";

function Sidedrawer(props) {
  function toggleNewEntry() {
    props.toggleNewEntry();
  }

  function setActiveEvent(name) {
    if (props.activeEvent !== null) {
      if (name === props.activeEvent.name) {
        props.setActiveEvent(null);
        return;
      }
    }

    for (let i = 0; i < props.eventArr.length; i++) {
      if (props.eventArr[i].name === name) {
        props.setActiveEvent(props.eventArr[i]);
        return;
      }
    }
  }

  function deleteEvent(name) {
    let arr = props.eventArr;
    for (let i = 0; i < arr.length; i++) {
      if (name === arr[i].name) {
        arr.splice(i, 1);
        localStorage.setItem("eventArr", JSON.stringify(arr));
        props.setEventArr(arr);
        props.setActiveEvent(null);
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
        {props.eventArr === null ? (
          <h6>Noch keine Events</h6>
        ) : (
          props.eventArr.map((e) => (
            <li key={e.name}>
              <Button
                className="ButtonAsH2"
                onClick={() => setActiveEvent(e.name)}
              >
                {e.name}
              </Button>
              <Button
                className="ButtonAsH2"
                onClick={() => deleteEvent(e.name)}
              >
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
