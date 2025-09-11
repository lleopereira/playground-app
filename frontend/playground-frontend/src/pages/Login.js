import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username" className="login-label">Usuário</label>
          <input
            id="username"
            data-test-id="input-username"
            type="text"
            placeholder="Informe seu usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="login-label">Senha</label>
          <input
            id="password"
            data-test-id="input-password"
            type="password"
            placeholder="Informe a sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <button
          id="login-button"
          data-test-id="button-login"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
