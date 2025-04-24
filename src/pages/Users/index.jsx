import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await api.get("users");
      setUsers(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setIsModalOpen(true);
  }

const handleDelete = async (id) => {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    try {
      await api.delete(`users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao atualizar:",err);
      alert("Erro ao excluir usuário");
    }
  }
}
  
const handleSaveUser = async () => {
 try{
  if(isCreating){
    await api.post("users", {
      name,
      email,
    });
  }else{
    await api.put(`users/${selectedUser.id}`, {
      name,
      email,
    });
  }
  setIsModalOpen(false);
  setIsCreating(false);
  fetchUsers();
 }catch(err){
  console.error("Erro: ", err)
  alert("Erro ao salvar usuário");
 }
}
  
  if (loading) return <div className="text-center text-gray-500">Carregando usuários...</div>;
  
  
  if (error) return <div className="text-center text-red-500">{error}</div>;
  
  
  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
      <h2 className="text-2xl font-semibold mb-6 mt-6 text-gray-800 text-center">Usuários Cadastrados</h2>
      <div className="flex justify-start px-6 mt-4 mb-4">
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
          onClick={() => {
            setSelectedUser(null);
            setName("");
            setEmail("");
            setIsCreating(true);
            setIsModalOpen(true);
          }}
        >
          Novo usuário
        </button>
      </div>
    <table className="min-w-full text-sm text-left text-gray-700">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="px-6 py-4 font-medium text-gray-600">ID</th>
          <th className="px-6 py-4 font-medium text-gray-600">Nome</th>
          <th className="px-6 py-4 font-medium text-gray-600">Email</th>
          <th className="px-6 py-4 font-medium text-gray-600">Ações</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user) => (
        <tr key={user.id} className="border-b hover:bg-gray-50">
          <td className="px-6 py-4">{user.id}</td>
          <td className="px-6 py-4">{user.name}</td>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4">
            <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none transition-colors duration-200 mr-2 cursor-pointer"
            onClick={() => handleEdit(user)}
            >
            <FaEdit size={20} />
            </button>
            <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition-colors duration-200 cursor-pointer"
            onClick={() => handleDelete(user.id)}
            >
            <FaTrashAlt size={20} />
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    
    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Editar usuário</h3>
          <div className="mb-4">
            <label className="block mb-1">Nome</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded px-3 py-2" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleSaveUser}
              >
                Salvar
              </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
