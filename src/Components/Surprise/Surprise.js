import React, { useContext } from "react";
import { MyContext } from "../../App";

const Surprise = () => {
  const [, , user] = useContext(MyContext);
  const picStyle = {
    background: "white",
    padding: "2px",
    borderRadius: "50%",
    maxWidth: "150px",
    width: "50%",
    boxShadow: '0px 0px 15px 0px #494949',
  };
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      {user && <h1>Hey {user.name || user.email}</h1>}
      <h1 className="mb-5">It's surprise..........!!!!!!!!!</h1>
      {user.photo && <img src={`${user.photo}`} alt="user's pic" style={picStyle}/>}
    </div>
  );
};

export default Surprise;
