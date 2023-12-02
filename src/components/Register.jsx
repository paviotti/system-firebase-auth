import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("teste@test.com");
  const [password, setPassword] = useState("123456");
  const navegate = useNavigate();

  // registerUser recebe setUser para gravar email e password
  const { registerUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    navegate("/"); // redireciona para a página inicial
    try {
      await registerUser(email, password);
      console.log("Usuário criado");
    } catch (error) {
      console.log(error.code);
      alert("Este email já existe");
    }
  };

  return (
    <>
      <h1>Register</h1>

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
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
