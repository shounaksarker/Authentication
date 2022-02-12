import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {MyContext} from "../../App";

const PrivateOutlet = () => {
  const [isLoggedIn] = useContext(MyContext);
  return (
    isLoggedIn ? <Outlet/> : <Navigate to="/authentication" />
  )
};

export default PrivateOutlet;
