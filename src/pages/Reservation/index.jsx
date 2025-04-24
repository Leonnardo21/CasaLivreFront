import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../../services/api";

export default function Reservation(){
  const [reservations, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [userId, setUserId] = useState("");  
  const [propertyId, setPropertyId] = useState("");  
  const [dateStart, setDateStart] = useState("");  
  const [dateEnd, setDateEnd] = useState("");  

  useEffect(() => {
    fetchReservations();
  })
  
  const fetchReservations = async () => {
    try{
      const response = await api.get("reservations");
      setReservation(response.data)
      // eslint-disable-next-line no-unused-vars
    }catch(err){
      setError("Erro ao carregar reservas");
    } finally {
      setLoading(false);
    }
  }  
  
  const handleDelete = async (id) => {
    if(confirm("Tem certeza que deseja excluir esta reserva?")){
      try{
        await api.delete(`reservations/${id}`);
      }catch (err) {
        console.error("Erro ao atualizar:",err);
        alert("Erro ao excluir propriedade");
      }
    }
  }

  const handleSaveReservation = async () => {
    try{
      if(isCreating){
        await api.post("/reservations", {
          userId,
          propertyId,
          dateStart,
          dateEnd,
        });
      }else{
        await api.put(`/reservations/${selectedReservation}`, {
          userId,
          propertyId,
          dateStart,
          dateEnd,
        });
      }
      setIsModalOpen(false);
      setIsCreating(false);
      fetchReservations
    }catch(err){
      console.error("Erro:", err);
            alert("Erro ao salvar reserva");
    }
  }
  
  if (loading) return <div className="text-center text-gray-500">Carregando reservas...</div>;
  
  
  if (error) return <div className="text-center text-red-500">{error}</div>;
  
  return(
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
      <h2 className="text-2xl font-semibold mb-6 mt-6 text-gray-800 text-center">Reservas</h2>
      <div className="flex justify-start px-6 mt-4 mb-4">
        <button 
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
        onClick={() => {
          setSelectedReservation(null);
          setUserId("");
          setPropertyId("");
          setDateStart(null);
          setDateEnd(null);
          setIsCreating(true);
          setIsModalOpen(true);
        }}
        >
        Nova reserva
        </button>
      </div>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-4 font-medium text-gray-600">ID</th>
              <th className="px-6 py-4 font-medium text-gray-600">UserID</th>
              <th className="px-6 py-4 font-medium text-gray-600">PropertyID</th>
              <th className="px-6 py-4 font-medium text-gray-600">Data início</th>
              <th className="px-6 py-4 font-medium text-gray-600">Data fim</th>
              <th className="px-6 py-4 font-medium text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{reservation.id}</td>
              <td className="px-6 py-4">{reservation.userId}</td>
              <td className="px-6 py-4">{reservation.propertyId}</td>
              <td className="px-6 py-4">{reservation.dateStart}</td>
              <td className="px-6 py-4">{reservation.dateEnd}</td>
              <td className="px-6 py-4">
                <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition-colors duration-200 cursor-pointer"
                onClick={() => handleDelete(reservation.id)}
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
              <h3 className="text-xl font-semibold mb-4">Editar propriedade</h3>
              <div className="mb-4">
                  <label className="block mb-1">Usuário</label>
                  <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded px-3 py-2" 
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Digite o ID do usuário"    
                  />
              </div>
              <div className="mb-4">
                  <label className="block mb-1">Propriedade</label>
                  <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded px-3 py-2" 
                      value={propertyId}
                      onChange={(e) => setPropertyId(e.target.value)}
                      placeholder="Digite o ID da propriedade"    
                  />
              </div>
              <div className="mb-4">
                  <label className="block mb-1">Data de início</label>
                  <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded px-3 py-2" 
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                      placeholder="Digite a data de início"    
                  />
              </div>
              <div className="mb-4">
                  <label className="block mb-1">Data expiração</label>
                  <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded px-3 py-2" 
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                      placeholder="Digite a data de fim"    
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
                      onClick={handleSaveReservation}    
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