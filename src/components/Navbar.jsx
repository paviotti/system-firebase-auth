import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  // encerra a sessão do usuário e redireciona para a página de login.
  const handleClickLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <div>
      {user ? (
        <>
          {/* se estiver logado, mostra o nome do usuário e um botão de logout.  */}
          <NavLink to="/">Home</NavLink>
          <button onClick={handleClickLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login | </NavLink>
          <NavLink to="/register">Register | </NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
