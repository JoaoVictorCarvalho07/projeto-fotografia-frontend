import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { useEffect } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(password);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-fundo px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-light p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-playfair text-primary mb-4 text-center">
          Login Admin
        </h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
