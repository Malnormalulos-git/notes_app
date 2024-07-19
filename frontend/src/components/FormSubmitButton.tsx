import { Button } from "@mui/material";

interface FormSubmitButtonProps {
  id?: string;
  text?: string;
}

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const {id, text} = props;

  return (
    <Button
      id={id === undefined ? "submitButton": id}
      variant="contained"
      type="submit"
    >
      {text === undefined ? "Submit": text}
    </Button>
  );
}

export default FormSubmitButton;