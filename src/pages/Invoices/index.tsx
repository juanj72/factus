import { useEffect, useState } from "react";
import api from "../../../src/api/axiosInstance";

type Bill = {
  id: number;
  number: string;
  identification: string;
  names: string;
  email: string | null;
  total: string;
  status: number;
  created_at: string;
  graphic_representation_name: string; 
};

export const Invoices = () => {
  const [invoices, setInvoices] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    identification: "",
    names: "",
    number: "",
    reference_code: "",
    status: "",
  });

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(`filter[${key}]`, value);
      });

      const res = await api.get(`/v1/bills?${params.toString()}`);
      setInvoices(res.data.data.data);
    } catch (err) {
      console.error("Error al obtener facturas", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInvoices();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Facturas</h1>

      {/* Filtros */}
      <form onSubmit={handleFilter} className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-2">
        <input
          type="text"
          name="identification"
          placeholder="Identificación"
          value={filters.identification}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="names"
          placeholder="Nombre"
          value={filters.names}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="number"
          placeholder="Número"
          value={filters.number}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="reference_code"
          placeholder="Código Ref."
          value={filters.reference_code}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
          className="border p-2 rounded"
        >
          <option value="">Todos</option>
          <option value="1">Aceptada</option>
          <option value="0">Pendiente</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 col-span-full md:col-auto">
          Buscar
        </button>
      </form>

      {/* Tabla */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Número</th>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Identificación</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{inv.number}</td>
                <td className="px-4 py-2">{inv.names || inv.graphic_representation_name}</td>
                <td className="px-4 py-2">{inv.identification}</td>
                <td className="px-4 py-2">{inv.email || "—"}</td>
                <td className="px-4 py-2">${Number(inv.total).toLocaleString()}</td>
                <td className="px-4 py-2">{inv.created_at}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white text-xs font-medium ${
                      inv.status === 1 ? "bg-green-500" : "bg-yellow-400"
                    }`}
                  >
                    {inv.status === 1 ? "Aceptada" : "Pendiente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
