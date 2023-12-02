import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  // se user estiver logado, useState(true) em UserProvider;

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");

  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      await loginUser(email, password);
      console.log("Usuário logado");
      navegate("/"); // redireciona para a página inicial
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <>
      <div>Login</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
