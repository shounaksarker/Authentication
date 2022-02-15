//firebase
import * as firebase from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import firebaseConfig from "../Auth/firebase.config";

const Header = () => {
  const navigate = useNavigate();

  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();

  const handleSignOut = () => {  
    localStorage.clear();

    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const homeStyle = {
    background: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    color: "black",
    textDecoration: "none",
    boxShadow: "0px 0px 10px 0px #868686",
  };
  const signOutStyle = {
    background: "red",
    border: "none",
    borderRadius: "20px",
    boxShadow: "0px 0px 10px 0px #868686",
  };
  return (
    <div className="container d-flex align-items-center justify-content-around pt-3">
      <Link to={"/"} style={homeStyle}>
        Home
      </Link>
      {(localStorage.getItem("email") || localStorage.getItem("name")) && (
        <Button style={signOutStyle} onClick={handleSignOut}>
          {" "}
          Sign Out{" "}
        </Button>
      )}
    </div>
  );
};

export default Header;
