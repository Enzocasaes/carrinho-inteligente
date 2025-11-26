import { Link } from "react-router-dom";
import products from "../data/products";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>Estoque Doméstico</h1>

      {products.map(prod => (
        <Link key={prod.id} to={`/product/${prod.id}`} style={{ textDecoration: 'none' }}>
          <div className="card" aria-label={`Produto ${prod.name}`}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{margin: 0}}>{prod.name}</h3>
              {prod.quantity <= prod.min ? (
                <span className="badge badge--danger">Crítico</span>
              ) : (
                <span className="badge badge--success">OK</span>
              )}
            </div>
            <p>Quantidade: <strong>{prod.quantity}</strong></p>
            <p className="muted">Quantidade mínima: {prod.min}</p>
          </div>
        </Link>
      ))}

      <div style={{display: 'flex', gap: 12, marginTop: 12}}>
        <Link to="/add-product">
          <button className="button" aria-label="Adicionar produto">Adicionar Produto</button>
        </Link>

        <Link to="/alerts">
          <button className="button button--secondary" aria-label="Ver alertas">Ver Alertas</button>
        </Link>
      </div>
    </div>
  );
}
