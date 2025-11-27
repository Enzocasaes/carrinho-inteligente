import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../api/products";
import Modal from "../components/Modal";

export default function ProductDetails() {
  const { id } = useParams();

  const [productState, setProductState] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editQuantity, setEditQuantity] = useState(0);
  const [editMin, setEditMin] = useState(0);

  useEffect(() => {
    const p = getProductById(Number(id));
    setProductState(p || null);
  }, [id]);

  if (!productState) {
    return (
      <div className="container">
        <h1>Produto não encontrado</h1>
      </div>
    );
  }

  function openModal() {
    setEditQuantity(productState.quantity);
    setEditMin(productState.min);
    setIsOpen(true);
  }

  function saveChanges(e) {
    e.preventDefault();
    const updated = updateProduct(productState.id, { quantity: Number(editQuantity), min: Number(editMin) });
    if (updated) {
      setProductState({ ...updated });
    }
    setIsOpen(false);
  }

  return (
    <div className="container">
      <h1>{productState.name}</h1>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0 }}>
            Quantidade atual: <strong>{productState.quantity}</strong>
          </p>
          {productState.quantity <= productState.min ? (
            <span className="badge badge--danger">Crítico</span>
          ) : (
            <span className="badge badge--success">OK</span>
          )}
        </div>
        <p className="muted">Quantidade mínima: {productState.min}</p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="button" onClick={openModal}>
          Repor Estoque
        </button>
        <Link to="/dashboard">
          <button className="button button--secondary">Voltar</button>
        </Link>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Repor: ${productState.name}`}>
        <form onSubmit={saveChanges}>
          <label htmlFor="quantity">Quantidade</label>
          <input id="quantity" className="input" type="number" min="0" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} />

          <label htmlFor="min">Quantidade mínima</label>
          <input id="min" className="input" type="number" min="0" value={editMin} onChange={(e) => setEditMin(e.target.value)} />

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="button" className="button button--secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="button">
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
