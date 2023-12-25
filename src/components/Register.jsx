import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errosFirebase";
import FormError from "./FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "./FormInput";
import TitleForm from "./TitleForm";
import Button from "./Button";

const Register = () => {
  const navegate = useNavigate();

  // registerUser recebe setUser para gravar email e password
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);

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
      <TitleForm text={"Register"} />

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
        <FormInput
          label="Confirme sua senha"
          type="password"
          placeholder="Confirme password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          error={errors.password}
        ></FormInput>

        <FormError error={errors.repassword} />
        {/* <button type="submit">Registrar</button> */}
        <Button text="Registrar" type="submit" />
      </form>
    </>
  );
};

export default Register;
