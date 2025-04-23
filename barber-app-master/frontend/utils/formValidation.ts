export const formatTimeInput = (input) => {
  // Remove caracteres não numéricos
  const numbers = input.replace(/\D/g, "");

  // Limita a 4 dígitos
  const time = numbers.slice(0, 4);

  // Formata para HH:mm
  if (time.length >= 3) {
    return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
  } else if (time.length === 2) {
    return `${time}:`;
  } else {
    return time;
  }
};

export const isPasswordValid = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const doPasswordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};
