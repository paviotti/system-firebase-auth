import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

// Verifca se o usuario esta logado, senão manda logar
const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  //   retorna todos os componentes filhos
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
