// O arquivo é .js porque devolve funcionalidades em JS e valida o formulario de Resgister.jsx

export const formValidate = (getValues) => {
  return {
    required: { value: true, message: "Campo obrigatório" },
    patternEmail: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "E-mail inválido",
    },
    minLength: {
      value: 6,
      message: "Senha fraca, minimo 6 caracteres",
    },
    // retorna um objeto
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "Senha, campo obrigatório.";
        }
        return true;
      },
    },
    validateEquals(values) {
      return {
        equals: (v) => v === values || "As senhas não conferem",
      };
    },
  };
};

export default formValidate;
