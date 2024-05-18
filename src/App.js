import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/:id" element={<Register />} />
        <Route exact path="/chat/:id" element={<ChatBox />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
