import { Alert, AlertColor, Snackbar } from "@mui/material";

export interface MessageSnackbarAttributes {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface MessageSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity : AlertColor;
  autoHideDuration ?: number;
}

const MessageSnackbar = (props: MessageSnackbarProps) => {
  const { open, 
          message, 
          onClose, 
          severity, 
          autoHideDuration 
        } = props;

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={ autoHideDuration || 7000} 
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