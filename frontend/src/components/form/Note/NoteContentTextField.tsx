import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { CommonTextFieldProps } from "../../../interfaces/CommonTextFieldProps";

interface NoteContentTextFieldProps extends CommonTextFieldProps { }

const NoteContentTextField = ({ id, register, helperText, error }: NoteContentTextFieldProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      rows={isSmallScreen ? 5 : 9}
    />
  );
}
export default NoteContentTextField;