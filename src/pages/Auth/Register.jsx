import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await api.post("auth/register", {
                name,
                email,
                password,
            });
            navigate("/login");
        // eslint-disable-next-line no-unused-vars
        }catch(err){
            setError("Erro ao registrar. Tente novamente");
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleRegister}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Criar conta</h2>

                {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

                <div className="mb-4">
                    <label className="block mb-1">Nome Completo</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome"
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1">Senha</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer"
                >
                    Registrar
                </button>

                <p className="text-center text-sm mt-4">
                    Já tem uma conta?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Faça login
                    </Link>
                </p>
            </form>
        </div>
    );
}