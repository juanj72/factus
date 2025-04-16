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

type PaginationLink = {
  label: string;
  url: string | null;
  active: boolean;
  page?: number;
};

type Pagination = {
  current_page: number;
  last_page: number;
  links: PaginationLink[];
};

export const Invoices = () => {
  const [invoices, setInvoices] = useState<Bill[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    identification: "",
    names: "",
    number: "",
    reference_code: "",
    status: "",
  });

  const fetchInvoices = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(`filter[${key}]`, value);
      });
      params.append("page", page.toString());

      const res = await api.get(`/v1/bills?${params.toString()}`);
      setInvoices(res.data.data.data);
      setPagination(res.data.data.pagination);
      setCurrentPage(page);
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
    fetchInvoices(1);
  };

  const handlePageClick = (page?: number) => {
    if (page) fetchInvoices(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Facturas</h1>

      {/* Filtros */}
      <form onSubmit={handleFilter} className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-2">
        {["identification", "names", "number", "reference_code"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(filters as any)[field]}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        ))}
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
        <>
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

          {/* Paginación */}
          {pagination?.links && (
            <div className="flex flex-wrap justify-center mt-6 gap-2">
              {pagination.links
                .filter((link) => link.label !== "...")
                .map((link, i) => {
                  // Extraer número de página del link.url si page no está definido
                  const pageMatch = link.url?.match(/page=(\d+)/);
                  const pageNumber = link.page ?? (pageMatch ? parseInt(pageMatch[1]) : undefined);

                  return (
                    <button
                      key={i}
                      disabled={!pageNumber}
                      onClick={() => handlePageClick(pageNumber)}
                      className={`px-3 py-1 rounded border ${
                        link.active
                          ? "bg-blue-600 text-white font-semibold"
                          : "hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                    {String(link.label).replace(/&raquo;|&laquo;/g, "").trim()}

                    </button>
                  );
                })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
