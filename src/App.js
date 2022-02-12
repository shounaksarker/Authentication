import { createContext, React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./Components/Auth/Authentication";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import PrivateOutlet from "./Components/PrivateOutlet/PrivateOutlet";
import Surprise from "./Components/Surprise/Surprise";
export const MyContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo:"",
  });

  return (
    <MyContext.Provider value={[isLoggedIn, setIsLoggedIn, user, setUser]}>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/*" element={<PrivateOutlet />}>
            <Route path="surprise" element={<Surprise />} />
          </Route>
        </Routes>
      </div>
    </MyContext.Provider>
  );
}

export default App;
