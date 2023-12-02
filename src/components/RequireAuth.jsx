import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

// Verifca se o usuario esta logado, senão manda logar
const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  //   retorna todos os componentes filhos
  return children;
};

export default RequireAuth;
