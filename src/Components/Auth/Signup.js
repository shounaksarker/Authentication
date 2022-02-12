// firebase
import * as firebase from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { MyContext } from "../../App";
import firebaseConfig from "./firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
//react-router
  let navigate = useNavigate();
  const location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };

  const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(MyContext);
  console.log(isLoggedIn);

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
    createUserWithEmailAndPassword(auth,user.email, user.password)
      .then(res=>{
          setUser(res);
          setIsLoggedIn(true);
          navigate(-1)
      })
      .catch((error) => {
        alert(error.message);
      });
      e.preventDefault();
  };

  return (
    <div>
      <div className="container mt-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
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

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
