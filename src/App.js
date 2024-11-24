import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./components/ListPage";
import DetailPage from "./components/DetailPage";
import UpdatePage from "./components/UpdatePage";
import CreatePage from "./components/CreatePage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/create" element={<CreatePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
