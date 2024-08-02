import { Button } from "@mui/material";

interface FormSubmitButtonProps {
  id ?: string;
  text ?: string;
  disabled ?: boolean;
}

const FormSubmitButton = ({id, text, disabled}: FormSubmitButtonProps) => {
  return (
    <Button
      id={id || "submitButton"}
      variant="contained"
      type="submit"
      disabled={disabled || false}
    >
      {text || "Submit"}
    </Button>
  );
}

export default FormSubmitButton;