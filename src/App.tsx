import React from "react";
import RegistrationContainer from "./Containers/RegistrationContainer";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProfilePage from "./Features/ProfilePage";
import LoginContainer from "./Containers/LoginContainer";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RegistrationContainer />} path="/register" />
        <Route element={<Home />} path="/home/:id" />
        <Route path="/profile/:emailId" element={<ProfilePage/>} />
        <Route element={<LoginContainer />} path="/" />
      </Routes>
    </div>
  );
}

export default App;
