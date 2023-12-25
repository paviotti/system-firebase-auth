import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errosFirebase";
import formValidate from "../utils/formValidate";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import TitleForm from "../components/TitleForm";
import Button from "../components/Button";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);

      navegate("/"); // redireciona para a página inicial
    } catch (error) {
      console.log(error.code);
      // erro personalizado, setError, verifica email já existente
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <TitleForm text={"Login"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Digite seu e-mail"
          type="email"
          placeholder="Digite Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        ></FormInput>
        <FormError error={errors.email} />
        <FormInput
          label="Digite sua senha"
          type="password"
          placeholder="Digite password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        ></FormInput>
        <FormError error={errors.password} />
        {/* <button type="submit">Login</button> */}
        <Button text="Login" type="submit" />
      </form>
    </>
  );
};

export default Login;
