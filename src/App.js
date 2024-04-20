import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login/:id" element={<Welcome />} />
        <Route exact path="/chat/:id" element={<ChatBox />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
