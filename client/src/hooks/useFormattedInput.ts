import { useRef, useEffect } from "react";
import { ValidatorFn } from "../utils/validators";

export enum InputType {
  Phone = "phone",
  Name = "name",
}

export const useFormattedInput = (formatFn: ValidatorFn) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      target.value = formatFn(target.value);
    };

    input.addEventListener("input", handleInput);
    return () => input.removeEventListener("input", handleInput);
  }, [formatFn]);

  return inputRef;
};