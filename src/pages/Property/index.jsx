import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../../services/api";

export default function Property(){
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [pricePerNight, setPricePerNight] = useState(0);
    const [ownerId, setOwnerId] = useState("");

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try{
            const response = await api.get("properties");
            setProperties(response.data);
        // eslint-disable-next-line no-unused-vars
        }catch(err){
            setError("Erro ao carregar propriedades");
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (property) => {
        setSelectedProperty(property);
        setTitle("");
        setDescription("");
        setAddress("");
        setPricePerNight();
        setIsModalOpen(true);
    }

    const handleDelete = async (id) => {
        if(confirm("Tem certeza que deseja excluir esta propriedade?")){
            try{
                await api.delete(`properties/${id}`);
            }catch (err) {
                console.error("Erro ao atualizar:",err);
                alert("Erro ao excluir propriedade");
            }
        }
    }

    const handleSaveProperty = async () => {
        try{
            if(isCreating){
                await api.post("/properties", {
                    title,
                    description,
                    address,
                    pricePerNight,
                    ownerId,
                });
            }else{
                await api.put(`/properties/${selectedProperty}`,{
                    title,
                    description,
                    address,
                    pricePerNight,
                });
            }
            setIsModalOpen(false);
            setIsCreating(false);
            fetchProperties();
        }catch(err){
            console.error("Erro:", err);
            alert("Erro ao salvar propriedade");
        }
    }

    if (loading) return <div className="text-center text-gray-500">Carregando propriedades...</div>;
  
  
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return(
        <div className="overlfow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
            <h2 className="text-2xl font-semibold mb-6 mt-6 text-gray-800 text-center">Propriedades cadastradas</h2>
            <div className="flex justify-start px-6 mt-4 mb-4">
                <button 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                        setSelectedProperty(null);
                        setTitle("");
                        setDescription("");
                        setAddress("");
                        setPricePerNight();
                        setOwnerId("");
                        setIsCreating(true);
                        setIsModalOpen(true);
                    }}
                >
                    Nova propriedade
                </button>
            </div>
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-6 py-4 font-medium text-gray-600">ID</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Title</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Description</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Endereço</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Valor do aluguel</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Proprietário</th>
                        <th className="px-6 py-4 font-medium text-gray-600">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id} className="border-b hover:bg-gray-50 text-center">
                            <td className="px-6 py-4">{property.id}</td>
                            <td className="px-6 py-4">{property.title}</td>
                            <td className="px-6 py-4">{property.description}</td>
                            <td className="px-6 py-4">{property.address}</td>
                            <td className="px-6 py-4 text-green-400 font-bold text-lg">R$ {property.pricePerNight}</td>
                            <td className="px-6 py-4">{property.ownerId}</td>
                            <td className="px-6 py-4">
                                <button 
                                    className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-yellow-700 focus:outline-none transition-colors duration-200 cursor-pointer"
                                    onClick={() => handleEdit(property)}
                                >
                                    <FaEdit size={20}/>
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition-colors duration-200 cursor-pointer"
                                    onClick={() => handleDelete(property.id)}
                                >
                                    <FaTrashAlt size={20}/>
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
                            <label className="block mb-1">Título</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded px-3 py-2" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Digite o título"    
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Descrição</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded px-3 py-2" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Digite a descrição"    
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Endereço</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded px-3 py-2" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Digite o endereço"    
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Valor do aluguel</label>
                            <input 
                                type="number" 
                                className="w-full border border-gray-300 rounded px-3 py-2" 
                                value={pricePerNight}
                                onChange={(e) => setPricePerNight(e.target.value)}
                                placeholder="Digite o valor do aluguel"    
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Proprietário</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded px-3 py-2" 
                                value={ownerId}
                                onChange={(e) => setOwnerId(e.target.value)}
                                placeholder="ID do proprietário"    
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
                                onClick={handleSaveProperty}    
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