import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import spaceMissionsData from "./space-mission-data.json";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard spaceMissions={spaceMissionsData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
