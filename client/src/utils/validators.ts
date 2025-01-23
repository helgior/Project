import { InputType } from "../hooks/useFormattedInput";

export const formatPhone = (value: string): string => {
  let numbers = value.replace(/\D/g, "").slice(0, 11);
  if (!numbers.startsWith("7")) numbers = "7" + numbers;
  return `+7 ${numbers.slice(1, 4)} ${numbers.slice(4, 7)}${
    numbers.length > 7 ? "-" : ""
  }${numbers.slice(7, 9)}${numbers.length > 9 ? "-" : ""}${numbers.slice(
    9,
    11
  )}`.trim();
};

export const formatName = (value: string): string => {
  return value.replace(/[^а-яё\s-]/gi, "");
};

export const validators = {
  [InputType.Phone]: formatPhone,
  [InputType.Name]: formatName,
} as const;

export type ValidatorFn = (value: string) => string;
