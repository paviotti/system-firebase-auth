import { Outlet } from "react-router-dom";
const LayoutContainerForm = () => {
  return (
    // Outlet é um componente que permite que você renderize outros componentes dentro de um componente.
    // O componente Outlet é utilizado para renderizar os componentes filhos de um componente principal.
    // neste caso ele abriga o formulário completo de Register e Login
    <div className="w-96 mx-auto mt-10">
      <Outlet />
    </div>
  );
};

export default LayoutContainerForm;
