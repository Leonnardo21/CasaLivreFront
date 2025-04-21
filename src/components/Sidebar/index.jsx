import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUserAlt, FaHome, FaClipboardList } from "react-icons/fa"; // Usando ícones para uma navegação mais visual

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6 shadow-lg flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-center">Casa Livre</h2>

      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <FaTachometerAlt size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/users"
          className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <FaUserAlt size={20} />
          <span>Usuários</span>
        </Link>

        <Link
          to="/property"
          className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <FaHome size={20} />
          <span>Propriedades</span>
        </Link>

        <Link
          to="/reservation"
          className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <FaClipboardList size={20} />
          <span>Reservas</span>
        </Link>
      </nav>

      <button
        className="mt-auto p-3 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200"
        onClick={handleLogout}
      >
        Sair
      </button>
    </aside>
  );
}
