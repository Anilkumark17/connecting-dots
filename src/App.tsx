import React from "react";
import RegistrationContainer from "./Containers/RegistrationContainer";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LoginContainer from "./Containers/LoginContainer";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RegistrationContainer />} path="/register" />
        <Route element={<Home />} path="/" />
        <Route element={<LoginContainer />} path="/login" />
      </Routes>
    </div>
  );
}

export default App;
