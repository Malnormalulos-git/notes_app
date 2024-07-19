import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar } from "@mui/material";
import { OverridableStringUnion } from '@mui/types';

interface MessageSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity : OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  autoHideDuration ?: number;
}

const MessageSnackbar = (props: MessageSnackbarProps) => {
  const { open, message, onClose, severity, autoHideDuration } = props;

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={autoHideDuration === undefined ? 7000: autoHideDuration} 
      onClose={onClose}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default MessageSnackbar;