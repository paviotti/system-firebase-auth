import { Link, NavLink } from "react-router-dom";
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
  const classButtonBlue =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none" +
    "focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const classButtonRed =
    "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2" +
    "dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            URLShort
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3  rtl:space-x-reverse">
          {user ? (
            <>
              {/* se estiver logado, mostra o nome do usuário e um botão de logout.  */}
              <NavLink to="/" className={classButtonBlue}>
                Inicio
              </NavLink>
              <button onClick={handleClickLogout} className={classButtonRed}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={classButtonBlue}>
                Login{" "}
              </NavLink>
              <NavLink to="/register" className={classButtonBlue}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
