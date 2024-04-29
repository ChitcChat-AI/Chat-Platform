import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import Modal from "./components/Modal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/:id" element={<Welcome />} />
        <Route exact path="/chat/:id" element={<ChatBox />} />
        <Route exact path="/modal" element={<Modal />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
