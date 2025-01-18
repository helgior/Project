export const validatePhone = (phone: string): boolean => {
  const cleanedPhone = phone.replace(/[^\d]/g, "");

  return cleanedPhone.startsWith("7") && cleanedPhone.length === 11;
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[А-ЯЁ][а-яё]+$/;
  return nameRegex.test(name);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 5;
};

export const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target;
  let value = input.value.replace(/[^\d]/g, "");

  if (!value.startsWith("7")) {
    value = "7" + value;
  }

  value = value.slice(0, 11);

  const formattedValue = `+7 ${value.slice(1, 4)} ${value.slice(
    4,
    7
  )}-${value.slice(7, 9)}-${value.slice(9, 11)}`;

  input.value = formattedValue.trim();
};

export const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target;
  input.value = input.value.replace(/[^а-яё\s-]/gi, "");
};
