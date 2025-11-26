import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input className="input" type="text" placeholder="E-mail" />
        <input className="input" type="password" placeholder="Senha" />

        <button className="button" type="submit">Entrar</button>
      </form>
    </div>
  );
}
