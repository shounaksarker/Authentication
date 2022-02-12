//firebase
import * as firebase from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import firebaseConfig from "../Auth/firebaseConfig";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(MyContext);

  const navigate = useNavigate();

  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();

  const handleSignOut = () => {
    const res = { ...user };
    res.email = "";
    res.name = "";
    res.password = "";
    res.photo = "";

    signOut(auth)
      .then(() => {
        navigate("/");
        setUser(res);
        setIsLoggedIn(false);
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
      {isLoggedIn && (
        <Button style={signOutStyle} onClick={handleSignOut}>
          {" "}
          Sign Out{" "}
        </Button>
      )}
    </div>
  );
};

export default Header;
