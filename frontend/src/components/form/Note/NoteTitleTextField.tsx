import { TextField } from "@mui/material";
import { CommonTextFieldProps } from "../../../interfaces/CommonTextFieldProps";

interface NoteTitleTextFieldProps extends CommonTextFieldProps { }

const NoteTitleTextField = (props: NoteTitleTextFieldProps) => {
  const { id, register, helperText, error } = props;

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