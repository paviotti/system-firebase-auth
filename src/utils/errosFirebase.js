// vai exportar todos os erros, como senhas incorretas e usuários que não existe
// Aqui é possível incluir todos os tipos de erros que podem acontecer no firebase

export const errorsFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este email já existe";

    case "auth/invalid-email":
      return "Formato de e-mail inválido";

    case "auth/weak-password":
      return "Senha fraca, minimo 6 caracteres";

    case "auth/user-not-found":
      return "Usuário não registrado";

    case "auth/invalid-login-credentials":
      return "Usuário não registrado, ou senha incorreta";

    default:
      return "Erro desconhecido no servidor";
  }
};
