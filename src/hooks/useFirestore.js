import {
  collection,
  setDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { useState } from "react";
import { auth, db } from "../firebase";
import { nanoid } from "nanoid";
// console.log("dbbb", db);
export const useFirestore = () => {
  // vai retornar um objeto

  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  // Le as informações no Firebase
  const getData = async () => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const dataRef = collection(db, "urls");
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      //   contem todo array do banco de dados
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  // Grava as informações no Firebase
  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newDoc = {
        enabled: true,
        nanoid: nanoid(6),
        origin: url,
        uid: auth.currentUser.uid,
      };
      // db vem de firebase.js, urls é o nome da coleção no firebase, newDoc é o id que vai ser gerado automaticamente
      const docRef = doc(db, "urls", newDoc.nanoid);
      // grava os dados digitado pelo usuário e o id gerado
      await setDoc(docRef, newDoc);
      // atualiza o estado da aplicação no array
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  // Apaga as informações no Firebase
  const deleteData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, deleteData: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      // atualiza localmente para economizar acesso ao Firebase
      setData(data.filter((item) => item.nanoid !== nanoid));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };
  const updateData = async (nanoid, newOrigin) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newOrigin });

      // atualiza localmente para economizar acesso ao Firebase
      setData(
        data.map((item) =>
          item.nanoid === nanoid ? { ...item, origin: newOrigin } : item
        )
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading((prev) => ({ ...prev, updateData: false }));
  };

  return { data, error, loading, getData, addData, deleteData, updateData };
};
