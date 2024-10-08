import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { NoteDto } from "../api/notesAppSchemas";
import InfoTextTypography from "./InfoTestTypography";
import { KeyboardEvent } from "react";
import formatDate from "../shared/formatDate";

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
            title={note.title!}
            tabIndex={0}
            onKeyDown={(e : KeyboardEvent) => e.key === 'Enter' && onEdit(note)}
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
        {note.content && <Typography 
          title={note.title + "`s Content"}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onEdit(note)}
          onClick={() => onEdit(note)}
          noWrap
          sx={{ 
            mt: 1, 
            cursor: 'pointer' 
          }}
        >
          {note.content}
        </Typography>}
        <InfoTextTypography
        text={
          note.lastUpdatedAt === note.createdAt
            ? `Created: ${formatDate(note.createdAt!)}`
            : `Updated: ${formatDate(note.lastUpdatedAt!)}`
        }
        />
      </CardContent>
    </Card>
  );
};

export default NoteCard;