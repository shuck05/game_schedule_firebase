import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles/Login.css";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameTextfieldChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordTextfieldChange(e) {
    setPassword(e.target.value);
  }

  function handleLogin() {
    props.setUserID(1);
  }

  return (
    <div className="background">
      <div className="center">
        <h1>Login for great Sceduling</h1>
        <TextField
          className="loginContent"
          label="Username"
          onChange={handleUsernameTextfieldChange}
        ></TextField>
        <TextField
          className="loginContent"
          label="Password"
          type="password"
          onChange={handlePasswordTextfieldChange}
        ></TextField>
        <Button
          className="loginContent"
          variant="outlined"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
