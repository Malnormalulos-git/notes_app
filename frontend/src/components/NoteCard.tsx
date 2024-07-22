import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { NoteDto } from "../api/notesAppSchemas";

interface NoteCardProps {
  note: NoteDto;
  onDelete: (id: number) => void;
}

const NoteCard = (props: NoteCardProps) => {  
  const {note, onDelete} = props;
  return (
    <Card 
      sx={{ 
        // mb: 2, 
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
          <Typography variant="h6">
            {note.title}
          </Typography>
          <IconButton
            onClick={() => onDelete(note.id!)}
          >
            <DeleteIcon/>
          </IconButton>
        </Box>
        <Typography 
          noWrap
          sx={{ mt: 1 }}
        >
          {note.body}
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