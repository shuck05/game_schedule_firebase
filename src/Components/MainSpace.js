// import { useState } from "react";
import "./styles/MainSpace.css";
import Scoreboard from "./Scoreboard";
import Schedule from "./Schedule";
import { useState } from "react";

function MainSpace(props) {
  const [renderMain, setRenderMain] = useState(true);

  function rend() {
    setRenderMain(!renderMain);
  }
  return (
    <div>
      {props.activeEvent === null ? (
        <div className="NewEventOuter">
          <div className="Flex-Row" style={{ paddingRight: "2vw" }}>
            <h1 className="Flex-grow">Kein Event ausgewählt</h1>
          </div>
        </div>
      ) : (
        <div className="NewEventOuter">
          <div>
            <h1 className="Flex-grow" style={{ paddingBottom: "2vw" }}>
              {props.activeEvent.name}{" "}
            </h1>
            <Scoreboard activeEvent={props.activeEvent}></Scoreboard>
            <div style={{ paddingBottom: "4vw" }}></div>
            <Schedule
              activeEvent={props.activeEvent}
              setEventArr={props.setEventArr}
              eventArr={props.eventArr}
              rend={rend}
            ></Schedule>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainSpace;
