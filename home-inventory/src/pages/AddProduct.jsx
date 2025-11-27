import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addProduct } from "../api/products";

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [min, setMin] = useState(0);

  function handleSave(e) {
    e && e.preventDefault();
    if (!name || !name.trim()) {
      alert("O nome do produto é obrigatório");
      return;
    }
    addProduct({ name, quantity: Number(quantity), min: Number(min) });
    navigate("/dashboard");
  }

  return (
    <div className="container">
      <h1>Adicionar Produto</h1>

      <label htmlFor="name">Nome</label>
      <input id="name" className="input" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="quantity">Quantidade Inicial</label>
      <input id="quantity" className="input" placeholder="Quantidade Inicial" type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      <label htmlFor="min">Quantidade Mínima</label>
      <input id="min" className="input" placeholder="Quantidade Mínima" type="number" min="0" value={min} onChange={(e) => setMin(e.target.value)} />

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button className="button" onClick={handleSave} aria-label="Salvar produto">Salvar</button>
        <button className="button button--secondary" onClick={() => navigate("/dashboard")}>Cancelar</button>
      </div>
    </div>
  );
}
