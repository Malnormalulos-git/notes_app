import { TextField } from "@mui/material";
import { CommonTextFieldProps } from "../../../interfaces/CommonTextFieldProps";

interface NoteContentTextFieldProps extends CommonTextFieldProps { }

const NoteContentTextField = (props: NoteContentTextFieldProps) => {
  const { id, register, helperText, error } = props;

  return (
    <TextField
      id={id || "noteContent"}
      {...register}
      helperText={helperText}
      error={error}
      fullWidth
      label="Content" 
      margin="normal"
      multiline
      rows={9}
    />
  );
}
export default NoteContentTextField;