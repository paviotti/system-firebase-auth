import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import TitleForm from "../TitleForm";
const LayoutRedirect = () => {
  const { nanoid } = useParams();
  const { searchData } = useFirestore();
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    searchData(nanoid).then((docSnap) => {
      if (docSnap.exists()) {
        console.log(docSnap.data().origin);
        window.location.href = docSnap.data().origin;
      } else {
        // setLoading(false);
      }
    });
  }, []);

  // if (loading) return <TitleForm text={"Carregando redirecionamento.."} />;

  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};

export default LayoutRedirect;
