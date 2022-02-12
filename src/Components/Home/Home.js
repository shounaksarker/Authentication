import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import img from "./img.png";

const Home = () => {
  return (
    <div className="bg">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-6">
            <img src={img} alt="" className="w-100" />
          </div>
          <div className="col-md-6 text-center">
            <h1 className="sur-text">Wanna get surprise..??</h1>
            <h3 className="mt-4">
              <Link to="surprise" className="click">
                Click Here
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
