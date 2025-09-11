import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Playground from "./pages/Playground";
import Inputs from "./pages/inputs";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/playground" element={
          <Layout>
            <Playground />
          </Layout>
        } />
        <Route path="/inputs" element={
          <Layout>
            <Inputs />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
