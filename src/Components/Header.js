import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles/Header.css";
import { auth } from "../firebase/FirebaseApp";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function logout() {
    auth.signOut();
    navigate("/");
  }

  function home() {
    props.setNewEntry(false);
    props.setActiveEvent(null);
  }

  function settings() {
    alert("settings");
  }
  return (
    <div className="Background">
      <h2 onClick={home}>Spielplan Schosch</h2>
      <div className="Button-Row">
        <IconButton onClick={settings}>
          <SettingsIcon sx={{ color: "white" }}></SettingsIcon>
        </IconButton>
        <IconButton onClick={logout}>
          <LogoutIcon sx={{ color: "white" }}></LogoutIcon>
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
