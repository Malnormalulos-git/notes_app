import { TextField } from "@mui/material";
import { CommonTextFieldProps } from "../../../interfaces/CommonTextFieldProps";

interface NoteTitleTextFieldProps extends CommonTextFieldProps { }

const NoteTitleTextField = ({ id, register, helperText, error } : NoteTitleTextFieldProps) => {
  return (
    <TextField
      id={id || "noteTitle"}
      {...register}
      helperText={helperText}
      error={error}
      fullWidth
      label="Title" 
      margin="normal"
    />
  );
}
export default NoteTitleTextField;