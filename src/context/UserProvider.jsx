import { PropTypes } from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
// Funciona como uma variavel global

export const UserContext = createContext();

// verifica se o usuário está logado

const UserProvider = ({ children }) => {
  // torna o usuário logado genérico para toda a aplicação
  const [user, setUser] = useState(false);

  // checa se o usuario esta autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      // se usuario estiver logado podemos pegar todas as suas informações
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // cria usuário
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Faz login usuário está logado
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Logout -> precisa sair em Navbar
  const signOutUser = () => signOut(auth);

  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
