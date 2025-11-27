import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const products = getAllProducts();
    setAlerts(products.filter((p) => p.quantity <= p.min));
  }, []);

  return (
    <div className="container">
      <h1>Alertas</h1>

      {alerts.length === 0 && (
        <div className="card">
          <p className="muted">Nenhum item em alerta. Tudo certo!</p>
        </div>
      )}

      {alerts.map((item) => (
        <div key={item.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <span className="badge badge--danger">Crítico</span>
          </div>
          <p>
            Quantidade atual: <strong>{item.quantity}</strong>
          </p>
          <p className="muted">Quantidade mínima recomendada: {item.min}</p>
          <div className="alert" role="status" aria-live="polite">
            Repor imediatamente para evitar falta.
          </div>
        </div>
      ))}
    </div>
  );
}
