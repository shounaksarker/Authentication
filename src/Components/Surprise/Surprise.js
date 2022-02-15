import React from "react";

const Surprise = () => {
  const localEmail = localStorage.getItem("email");
  const localName = localStorage.getItem("name");
  const localPhoto = localStorage.getItem("photo");

  const picStyle = {
    background: "white",
    padding: "2px",
    borderRadius: "50%",
    maxWidth: "150px",
    width: "50%",
    boxShadow: "0px 0px 15px 0px #494949",
  };
  return (
    <div className="container d-flex <flex-column> justify-content-center align-items-center mt-5">
      {(localName || localEmail) && <h1>Hey {localName || localEmail}</h1>}
      <h1 className="mb-5">It's surprise..........!!!!!!!!!</h1>
      {localPhoto && (
        <img src={`${localPhoto}`} alt="user's pic" style={picStyle} />
      )}
    </div>
  );
};

export default Surprise;
