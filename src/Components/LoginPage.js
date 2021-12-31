import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseApp";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameTextfieldChange(e) {
    setUsername(e.target.value);
    if (auth.currentUser !== null) console.log(auth.currentUser.email);
  }

  function handlePasswordTextfieldChange(e) {
    setPassword(e.target.value);
  }

  function handleLogout() {
    auth.signOut();
  }

  function handleLogin() {
    console.log("Logging in with:", username, password);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        alert("Username oder Passwort falsch");
      });
  }

  function dummy(){}
    

  return (
    <div className="background">
      <div className="center" style={{ minWidth: "20vw" }}>
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
          style={{ color: "#61dafb", borderColor: "#61dafb" }}
          className="loginContent"
          variant="outlined"
          onClick={handleLogin}
        >
          Login
        </Button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <Link to="/signup" style={{ color: "#61dafb" }}>
              Create Account
            </Link>
          </div>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={dummy}>Dummy</Button>
      </div>
    </div>
  );
}

export default LoginPage;
