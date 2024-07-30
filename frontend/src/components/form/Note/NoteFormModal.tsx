import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface FormContainerProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const NoteFormModal = ({title, open, onClose, children} : FormContainerProps) => {
  return(
    <Modal
        open={open}
        onClose={onClose}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {xs:"80%", sm:"70%"},
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography
            variant="h6" 
            component="h2" 
            sx={{ mb: 2 }}
          >
            {title}
          </Typography>
          {children}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
  );
}

export default NoteFormModal;