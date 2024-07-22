import { useDeleteNote, useGetNotes } from "../api/notesAppComponents";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import NoteCard from "../components/NoteCard";
import MessageSnackbar from "../components/MessageSnackbar";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AddNote from "../components/AddNote";

const HomePage = () => {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [queryError, setQueryError] = useState("");

  const queryClient = useQueryClient();

  const { data: notes, status: queryStatus, error } = useGetNotes({});

  const { mutate } = useDeleteNote(
    {
      // onMutate: () => {
      //   onStartExecutingAction();
      // },
      onError: (e) => {
        // console.log(e);
        setQueryError(`${e.message}: ${e.stack.payload || e.stack.title || e.name}.`);
        setOpenErrorSnackbar(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const deleteNote = (id: number) => {
    console.log(id);
    mutate({
      pathParams: {
        id: id
      }
    });
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        {/* <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
        >
          My Notes
        </Typography> */}
        {queryStatus === 'pending' && (
          <Box 
            display="flex" 
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        )}
        {queryStatus === 'error' && (
          <Alert severity="error">{`${error.message}: ${error.stack.payload || error.stack.title || error.name}.`}</Alert>
        )}
        {queryStatus === 'success' && notes.length === 0 && (
          <Alert severity="info">No notes found</Alert>
        )}
        {queryStatus === 'success' && (
          <Grid 
            container 
            spacing={3}
          >
            {notes.map(note => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={note.id}
              >
                <NoteCard 
                  note={note} 
                  onDelete={deleteNote}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <MessageSnackbar
        severity="error"
        open={openErrorSnackbar}
        message={queryError}
        onClose={() => setOpenErrorSnackbar(false)}
      />
      <AddNote/>
    </>
  );
};

export default HomePage;