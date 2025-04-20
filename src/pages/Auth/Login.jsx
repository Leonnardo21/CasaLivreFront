import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try{
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    // eslint-disable-next-line no-unused-vars
    }catch (err){
      setError("Email ou senha inválidos.");
    }
  }

  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
        <h1 className="text-2xl font-bold mb-6 text-center">Casa Livre</h1>

        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="text" 
            className="w-full border rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />            
        </div>
        <div className="b-6">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input 
            type="password" 
            className="w-full border rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full mt-2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition cursor-pointer">
          Entrar
        </button>
      </form>
    </div>
  );
}
