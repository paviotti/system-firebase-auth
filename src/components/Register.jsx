import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errosFirebase";
import FormError from "./FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "./FormInput";

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
      setError("firebase", {
        message: errorsFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Register</h1>

      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Digite Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>

        <FormError error={errors.email} />

        <FormInput
          type="password"
          placeholder="Digite password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        ></FormInput>

        <FormError error={errors.password} />
        <FormInput
          type="password"
          placeholder="Confirme password"
          {...register("repassword", {
            validate: validateEquals(getValues),
          })}
        ></FormInput>

        <FormError error={errors.repassword} />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
