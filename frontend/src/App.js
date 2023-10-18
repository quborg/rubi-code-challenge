import React from "react";
import "./App.sass";

import { Routes, Route, NavLink } from "react-router-dom";

import { Projects, Tasks } from "./components/pages";


function App() {
  return (
    <div className="App">
      <div className="top-bar container flex justify-center">
        <NavLink to={"/"} className="nav-link">
          Welcome to MERN Stack App
        </NavLink>
      </div>

      <nav className="navbar">
        <div className="container flex justify-start">
          <div className="menu-item"><NavLink to={"/projects"} className={({isActive}) => `nav-link${isActive?" active":""}`}>
            Projects
          </NavLink></div>
          <div className="menu-item"><NavLink to={"/tasks"} className={({isActive}) => `nav-link${isActive?" active":""}`}>
            Tasks
          </NavLink></div>
        </div>
      </nav>

      <div className="container">
        <div className="wrapper">
          <Routes>
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;