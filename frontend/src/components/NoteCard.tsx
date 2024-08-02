import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { NoteDto } from "../api/notesAppSchemas";

interface NoteCardProps {
  note: NoteDto;
  onDelete: (id: number) => void;
  onEdit: (note: NoteDto) => void;
}

const NoteCard = ({note, onDelete, onEdit} : NoteCardProps) => {  
  return (
    <Card 
      sx={{ 
        width: '100%', 
        boxShadow: '0 0 5px #5292D2'
      }}
    >
      <CardContent
        sx={{ padding: "16px !important" }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Typography 
            variant="h6"
            onClick={() => onEdit(note)}
            sx={{ cursor: 'pointer' }}
          >
            {note.title}
          </Typography>
          <IconButton
            onClick={() => onDelete(note.id!)}
          >
            <DeleteIcon/>
          </IconButton>
        </Box>
        <Typography 
          onClick={() => onEdit(note)}
          noWrap
          sx={{ 
            mt: 1, 
            cursor: 'pointer' 
          }}
        >
          {note.content}
        </Typography>
        <Typography 
          color="text.secondary" 
          gutterBottom
        >
          Updated: {new Date(note.lastUpdatedAt!).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;