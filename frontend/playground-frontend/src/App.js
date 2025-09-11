import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Playground from "./pages/Playground";
import Inputs from "./pages/inputs";
import UnderConstruction from "./pages/UnderConstruction";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/playground" element={
            <ProtectedRoute>
              <Layout>
                <Playground />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/inputs" element={
            <ProtectedRoute>
              <Layout>
                <Inputs />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/textarea" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/checkboxes" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/radios" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/selects" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/tags" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/datepicker" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/tables" element={
            <ProtectedRoute>
              <Layout>
                <UnderConstruction />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
