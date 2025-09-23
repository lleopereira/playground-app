import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to playground
    if (isAuthenticated) {
      navigate('/playground', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateFields = () => {
    if (!username && !password) {
      setError('Você precisa preencher os campos "Usuário" e "Senha" para realizar o login.');
      return false;
    }
    if (!username) {
      setError("Preencha o usuário para realizar o login");
      return false;
    }
    if (!password) {
      setError("Preencha a sua senha para realizar o login");
      return false;
    }
    setError(""); // clear error if all good
    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      if (res.data.success) {
        login(username, password);
        navigate("/playground");
      }
    } catch (err) {
      setError("Usuário ou senha incorretos");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div 
      className="login-background"
      id="login-page"
      data-test-id="login-page-background"
    >
      <div 
        className="login-container"
        id="login-form-container"
        data-test-id="login-container"
        role="main"
        aria-labelledby="page-heading"
      >
        <h2 
          className="login-title"
          id="page-heading"
          data-test-id="login-title-heading"
        >
          Login
        </h2>

        {error && (
          <p 
            className="error-message"
            id="login-error"
            data-test-id="login-error-message"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        <div 
          className="form-group"
          data-test-id="username-form-group"
          id="username-group"
        >
          <label 
            htmlFor="username" 
            className="login-label"
            data-test-id="username-label"
          >
            Usuário
          </label>
          <input
            id="username"
            data-test-id="username-input"
            type="text"
            name="username"
            placeholder="Informe seu usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="username"
            required
            aria-describedby={error ? "login-error" : undefined}
          />
        </div>

        <div 
          className="form-group"
          data-test-id="password-form-group"
          id="password-group"
        >
          <label 
            htmlFor="password" 
            className="login-label"
            data-test-id="password-label"
          >
            Senha
          </label>
          <input
            id="password"
            data-test-id="password-input"
            type="password"
            name="password"
            placeholder="Informe a sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="current-password"
            required
            aria-describedby={error ? "login-error" : undefined}
          />
        </div>

        <button
          id="login-button"
          data-test-id="login-submit-button"
          type="button"
          className="login-button"
          onClick={handleLogin}
          aria-label="Submit login form"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
