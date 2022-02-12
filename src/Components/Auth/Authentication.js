import * as firebase from "firebase/app"; // import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { Button, Fade, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// Mine
import { MyContext } from "../../App";
import "./Authentication.css";
import firebaseConfig from "./firebaseConfig";

const Authentication = () => {
  // ------ from app.js -------
  const [, setIsLoggedIn, user, setUser] = useContext(MyContext);

  // ------ firebase ------
  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
  const gglProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  let navigate = useNavigate();

  // ------ toggle login & signup ------
  let [loginBtn, setLoginBtn] = useState(true);
  const toggle = () => {
    setLoginBtn(!loginBtn);
  };

  // ------- Submission functions -------
  const handleBlur = (e) => {
    let res = { ...user };
    if (e.target.name === "name") {
      res.name = e.target.value;
      setUser(res);
    }
    if (e.target.name === "email") {
      res.email = e.target.value;
      setUser(res);
    }
    if (e.target.name === "password") {
      res.password = e.target.value;
      setUser(res);
    }
    // res[e.target.name] = e.target.value;
    // setUser(res)
  };

  const handleSubmit = (e) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        // console.log(res);
        setIsLoggedIn(true);
        navigate(-1);
      })
      .catch((error) => {
        alert(error.code);
      });

    e.preventDefault();
  };

  const handleSubmit2 = (e) => {
    createUserWithEmailAndPassword(auth, user.email, user.password, user.name)
      .then((res) => {
        // console.log(res)
        setIsLoggedIn(true);
        navigate(-1);
      })
      .catch((error) => {
        alert(error.message);
      });
    e.preventDefault();
  };

  // ------- social media sign in -------
  const handleSocialLogin = (x) => {
    const res = { ...user };
    res.name = x.user.displayName;
    res.email = x.user.email;
    res.photo = x.user.photoURL;
    setUser(res);
    setIsLoggedIn(true);
    navigate(-1);
  };
  const handleGoogle = () => {
    signInWithPopup(auth, gglProvider)
      .then((ggl) => handleSocialLogin(ggl))
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleFb = () => {
    signInWithPopup(auth, fbProvider)
      .then((fb) => handleSocialLogin(fb))
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="authentication">
      <div className="container-md">
        <div className="sign-form mt-5">
          <div className="d-flex">
            <button
              className={loginBtn ? "btn login active" : "btn login"}
              onClick={toggle}
              aria-controls="example-collapse-text"
              aria-expanded={loginBtn}
            >
              Login
            </button>

            <button
              className={!loginBtn ? "btn signup active" : "btn signup"}
              onClick={toggle}
              aria-controls="example-fade-text"
              aria-expanded={!loginBtn}
            >
              SignUp
            </button>
          </div>

          {/* -------- login Form -------- */}

          <Fade in={loginBtn}>
            <Form
              className={loginBtn ? "p-3" : "p-3 d-none"}
              id="example-collapse-text"
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Button
                className="submit"
                variant="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Log in
              </Button>
            </Form>
          </Fade>

          {/* -------- sign up -------- */}

          <Fade in={!loginBtn}>
            <Form
              className={!loginBtn ? "p-3" : "p-3 d-none"}
              id="example-fade-text"
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onBlur={handleBlur}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Button
                className="submit"
                variant="primary"
                type="submit"
                onClick={handleSubmit2}
              >
                Create Account
              </Button>
            </Form>
          </Fade>

          {/* others login option  */}

          <div className="p-3">
            <Button className="social-btn" type="submit" onClick={handleGoogle}>
              Log in with Google
            </Button>

            <Button className="social-btn" type="submit" onClick={handleFb}>
              Log in with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
