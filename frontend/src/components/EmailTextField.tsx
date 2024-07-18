import { TextField } from "@mui/material";
import { CommonTextFieldProps } from "../shared/interfaces/CommonTextFieldProps";

interface EmailTextFieldProps extends CommonTextFieldProps { }

const EmailTextField = (props: EmailTextFieldProps) => {
  const { id, register, helperText, error } = props;

  return (
    <TextField
      id={id}
      {...register}
      helperText={helperText}
      error={error}
      label="Email" 
      variant="outlined"
      size="small"
      autoFocus
    />
  );
}
export default EmailTextField;