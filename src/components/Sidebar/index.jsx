import { Link, useNavigate} from "react-router-dom";

export default function Sidebar(){
    const  navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    
    return(
        <aside className="w-64 bg-white shadow-md p-6">
            <h2 className="text-xl font-bold mb-8">Casa Livre</h2>

            <nav className="flex flex-col gap-4">
                <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
                <Link to="/users" className="text-blue-600 hover:underline">Usuários</Link>
                <Link to="/property" className="text-blue-600 hover:underline">Propriedades</Link>
                <Link to="/reservation" className="text-blue-600 hover:underline">Reservas</Link>
            </nav>

            <button 
                className="mt-10 text-red-500 hover:underline text-sm"
                onClick={handleLogout}
            >
                Sair
            </button>
        </aside>
    );
}