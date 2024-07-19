import { UseFormRegisterReturn } from "react-hook-form";

export interface CommonTextFieldProps {
  id?: string;
  register: UseFormRegisterReturn;
  helperText?: string;
  error?: boolean;
}