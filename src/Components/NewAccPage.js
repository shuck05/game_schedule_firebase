import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles/Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";
import { auth } from "../firebase/FirebaseApp";

export default function NewAccPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  function handleUsernameTextfieldChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordTextfieldChange(e) {
    setPassword(e.target.value);
  }

  function handlePasswordCheckTextfieldChange(e) {
    setPasswordCheck(e.target.value);
  }

  function handleCreateAccount() {
    if (password === passwordCheck) {
      if (username.length < 4) return;
      if (Password.length < 8) return;
      createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          props.setUserID(user.uid);
          alert("Account wurde erfolgreich erstellt.");
          navigate("/");
        })
        .catch((error) => {
          // alert("Der Account konnte nicht erstellt werden.");
        });

      setUsername("");
      setPassword("");
      setPasswordCheck("");
      navigate("/");
      return;
    } else {
      alert("Passwörter waren nicht identisch");
    }
    console.log(username, password, passwordCheck);
  }

  return (
    <div className="background">
      <div className="center" style={{ minWidth: "20vw" }}>
        <h1>Creating an Account</h1>
        <TextField
          className="loginContent"
          label="E-Mail"
          onChange={handleUsernameTextfieldChange}
        ></TextField>
        <TextField
          className="loginContent"
          label="Password"
          type="password"
          onChange={handlePasswordTextfieldChange}
        ></TextField>
        <TextField
          className="loginContent"
          label="Confirm Password"
          type="password"
          onChange={handlePasswordCheckTextfieldChange}
        ></TextField>
        <Button
          className="loginContent"
          variant="outlined"
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
