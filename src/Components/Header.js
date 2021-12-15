import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles/Header.css";

function Header(props) {
  function logout() {
    props.setUserID(null);
  }

  function settings() {
    alert("settings");
  }
  return (
    <div className="Background">
      <h2>Spielplan Schosch</h2>
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
