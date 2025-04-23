export const handleAuthError = (error: any): string => {
  let errorMessage = "Erro ao realizar login.";

  switch (error.code) {
    case "auth/wrong-password":
      errorMessage = "A senha informada está incorreta. Tente novamente.";
      break;
    case "auth/user-not-found":
      errorMessage = "Nenhum usuário encontrado com esse e-mail. Verifique se o e-mail está correto.";
      break;
    case "auth/invalid-email":
      errorMessage = "O e-mail informado é inválido. Verifique e tente novamente.";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "Essa operação não é permitida. Verifique as configurações do Firebase.";
      break;
    case "auth/weak-password":
      errorMessage = "A senha informada é muito fraca. Tente usar uma senha mais forte.";
      break;
    case "auth/email-already-in-use":
      errorMessage = "O e-mail informado já está cadastrado. Tente fazer login ou use outro e-mail.";
      break;
    case "auth/invalid-credential":
      errorMessage = "As credenciais informadas são inválidas. Verifique e tente novamente.";
      break;
    default:
      errorMessage = error.message || "Ocorreu um erro desconhecido.";
  }

  return errorMessage;
};
