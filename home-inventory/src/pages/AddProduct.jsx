import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Adicionar Produto</h1>

      <input className="input" placeholder="Nome" />
      <input className="input" placeholder="Quantidade Inicial" />
      <input className="input" placeholder="Quantidade Mínima" />

      <button className="button" onClick={() => navigate("/dashboard")}>
        Salvar
      </button>
    </div>
  );
}
