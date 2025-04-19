import { use, useEffect, useState } from "react";
import api from "../../../src/api/axiosInstance";
import Swal from "sweetalert2";

export const CreateInvoice = () => {
  const [form, setForm] = useState({
    reference_code: "",
    observation: "",
    payment_method_code: "",
    numbering_range_id: "",
    customer: {
      identification: "",
      dv: "",
      company: "",
      trade_name: "",
      names: "",
      address: "",
      email: "",
      phone: "",
      legal_organization_id: 2,
      tribute_id: "",
      identification_document_id: "",
      municipality_id: "",
    },
    items: [
      {
        code_reference: "",
        name: "",
        quantity: 1,
        discount_rate: 0,
        discount: 0,
        price: "",
        tax_rate: 0,
        unit_measure_id: "",
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 4,
        withholding_taxes: [],
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const [ranges, setRanges] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [tributes, setTributes] = useState<{ value: number; label: string }[]>(
    []
  );
  const [units, setUnits] = useState([]);
  const [payment_method_code, setPaymentMethodCode] = useState<
    { value: number; label: string }[]
  >([]);
  const [identification_document_id, setIdentificationDocumentId] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    setPaymentMethodCode([
      { value: 10, label: "Efectivo" },
      { value: 11, label: "Cheque" },
      { value: 12, label: "Transferencia bancaria" },
      { value: 13, label: "Tarjeta de crédito" },
      { value: 14, label: "Tarjeta de débito" },
      { value: 15, label: "Otros" },
    ]);
  }, []);

  useEffect(() => {
    setIdentificationDocumentId([
      { value: 1, label: "Cedula de ciudadania" },
      { value: 2, label: "Cedula de extranjeria" },
      { value: 3, label: "Registro civil de nacimiento" },
      { value: 4, label: "Pasaporte" },
      { value: 5, label: "Tarjeta de identidad" },
      { value: 6, label: "Cedula de extranjeria" },
    ]);
  }, []);

  useEffect(() => {
    setTributes([
      { value: 18, label: "IVA" },
      { value: 21, label: "No aplica *" },
    ]);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const [rangeRes, muniRes, unitRes] = await Promise.all([
        api.get("/v1/numbering-ranges"),
        api.get("/v1/municipalities"),
        api.get("/v1/measurement-units"),
      ]);
      setRanges(rangeRes.data.data);
      setMunicipalities(muniRes.data.data);
      setUnits(unitRes.data.data);
    }
    fetchData();
  }, []);

  const handleChange = (e: any, fieldPath: string[]) => {
    const updatedForm = { ...form };
    let current: any = updatedForm;
    fieldPath.slice(0, -1).forEach((path) => {
      current = current[path];
    });
    current[fieldPath.at(-1)] = e.target.value;
    setForm(updatedForm);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); // inicia loading
    try {
      const response = await api.post("/v1/bills/validate", form);
      Swal.fire({
        title: "Confirmado",
        text:
          "Facturada " + response.data.data.bill.number + "creada exitosamente",
        icon: "success",
        confirmButtonText: "Entendido",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "No se pudo crear la factura",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false); // termina loading
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Crear Factura</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          required
          placeholder="Código de Referencia"
          value={form.reference_code}
          onChange={(e) => handleChange(e, ["reference_code"])}
          className="border p-2 rounded"
        />
        <input
          required
          type="text"
          placeholder="Observación"
          value={form.observation}
          onChange={(e) => handleChange(e, ["observation"])}
          className="border p-2 rounded"
        />
        <select
          required
          value={form.numbering_range_id}
          onChange={(e) => handleChange(e, ["numbering_range_id"])}
          className="border p-2 rounded"
        >
          <option value="">Seleccionar rango numeración</option>
          {ranges.map((r: any) => (
            <option key={r.id} value={r.id}>
              {r.prefix} ({r.from} - {r.to})
            </option>
          ))}
        </select>

        <h2 className="font-semibold mt-4">Datos del Cliente</h2>
        <input
          required
          type="text"
          placeholder="Identificación"
          value={form.customer.identification}
          onChange={(e) => handleChange(e, ["customer", "identification"])}
          className="border p-2 rounded"
        />
        <input
          required
          type="text"
          placeholder="Nombre"
          value={form.customer.names}
          onChange={(e) => handleChange(e, ["customer", "names"])}
          className="border p-2 rounded"
        />
        <input
          required
          type="text"
          placeholder="Email"
          value={form.customer.email}
          onChange={(e) => handleChange(e, ["customer", "email"])}
          className="border p-2 rounded"
        />
        <input
          required
          type="text"
          placeholder="Teléfono"
          value={form.customer.phone}
          onChange={(e) => handleChange(e, ["customer", "phone"])}
          className="border p-2 rounded"
        />
        <input
          required
          type="text"
          placeholder="Dirección"
          value={form.customer.address}
          onChange={(e) => handleChange(e, ["customer", "address"])}
          className="border p-2 rounded"
        />
        <select
          required
          value={form.customer.municipality_id}
          onChange={(e) => handleChange(e, ["customer", "municipality_id"])}
          className="border p-2 rounded"
        >
          <option value="">Municipio</option>
          {municipalities.map((m: any) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.department})
            </option>
          ))}
        </select>
        <select
          required
          value={form.customer.identification_document_id}
          onChange={(e) =>
            handleChange(e, ["customer", "identification_document_id"])
          }
          className="border p-2 rounded"
        >
          <option value="">Tipo de Documento</option>
          {identification_document_id.map((m: any) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <select
          required
          value={form.customer.tribute_id}
          onChange={(e) => handleChange(e, ["customer", "tribute_id"])}
          className="border p-2 rounded"
        >
          <option value="">Tipo de tributo</option>
          {tributes.map((m: any) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <h2 className="font-semibold mt-4">Ítems</h2>
        {form.items.map((item, index) => (
          <div key={index} className="border p-4 rounded grid gap-2">
            <input
              required
              type="text"
              placeholder="Codigo de referencia"
              value={item.code_reference}
              onChange={(e) => {
                const newItems = [...form.items];
                newItems[index].code_reference = e.target.value;
                setForm({ ...form, items: newItems });
              }}
              className="border p-2 rounded"
            />
            <input
              required
              type="text"
              placeholder="Nombre del producto"
              value={item.name}
              onChange={(e) => {
                const newItems = [...form.items];
                newItems[index].name = e.target.value;
                setForm({ ...form, items: newItems });
              }}
              className="border p-2 rounded"
            />
            <input
              required
              type="number"
              placeholder="Valor del producto"
              value={item.price}
              onChange={(e) => {
                const newItems = [...form.items];
                newItems[index].price = e.target.value;
                setForm({ ...form, items: newItems });
              }}
              className="border p-2 rounded"
            />

            <input
              required
              type="number"
              placeholder="Cantidad"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...form.items];
                newItems[index].quantity = parseInt(e.target.value);
                setForm({ ...form, items: newItems });
              }}
              className="border p-2 rounded"
            />
            <select
              required
              value={item.unit_measure_id}
              onChange={(e) => {
                const newItems = [...form.items];
                newItems[index].unit_measure_id = parseInt(e.target.value);
                setForm({ ...form, items: newItems });
              }}
              className="border p-2 rounded"
            >
              <option value="">Unidad de medida</option>
              {units.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        <h2>Metodo de pago</h2>
        <div className="border p-4 rounded grid gap-2">
          <select
            required
            value={form.payment_method_code}
            onChange={(e) => handleChange(e, ["payment_method_code"])}
          >
            <option value="">Seleccione un metodo de pago</option>
            {payment_method_code.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creando factura..." : "Crear Factura"}
        </button>
      </form>
    </div>
  );
};
