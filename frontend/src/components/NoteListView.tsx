import { GetNotesError, useDeleteNote } from "../api/notesAppComponents";
import { Box, Grid, CircularProgress, Alert, Pagination } from "@mui/material";
import NoteCard from "./NoteCard";
import MessageSnackbar, { MessageSnackbarAttributes } from "./MessageSnackbar";
import { useState } from "react";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import AddNote from "./AddNote";
import { NoteDto, NoteDtoPaginatedResult } from "../api/notesAppSchemas";
import EditNote from "./EditNote";

interface NoteListViewProps {
  query: UseQueryResult<NoteDtoPaginatedResult, GetNotesError>;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const NoteListView = ({query, pageIndex: page, setPageIndex: setPage}: NoteListViewProps) => {
  const [messageSnackbarAttributes, setMessageSnackbarAttributes] = useState<MessageSnackbarAttributes>({
    open: false,
    message: "",
    severity: "info"
  });

  const queryClient = useQueryClient();

  const { data: notes, status: queryStatus, error } = query;

  const { mutate: deleteNote } = useDeleteNote(
    {
      onError: (e) => {
        setMessageSnackbarAttributes({
          open: true,
          message: `${e.message}: ${e.stack.payload || e.stack.title || e.name}.`,
          severity: "error"
        });
      },
      onSuccess: () => {
        setMessageSnackbarAttributes({
          open: true,
          message: "Note successfully deleted.",
          severity: "success"
        });
        if(notes!.pageIndex == notes!.totalPages && 
          (notes!.totalCount! - notes!.pageSize! * (notes!.totalPages! - 1)) == 1)
            setPage(page - 1);
        queryClient.invalidateQueries();
      },
    }
  );

  const handleDeleteNote = (id: number) => {
    deleteNote({
      pathParams: {
        id: id
      }
    });
  }

  const [editingNote, setEditingNote] = useState<NoteDto | null>(null);
  const handleEditNote = (note: NoteDto) => {
    setEditingNote(note);
  };

  const handleCloseEditModal = () => {
    setEditingNote(null);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, pageIndex: number) => {
    setPage(pageIndex);
  };

  return (
    <>
      <Box 
        sx={{ 
          p: 3, 
          pb: 12
        }}
      >
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
        {queryStatus === 'success' && notes.items!.length === 0 && (
          <Alert severity="info">No notes found</Alert>
        )}
        {queryStatus === 'success' && (
          <>
            <Grid container spacing={3}>
              {notes.items!.map(note => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                  <NoteCard 
                    note={note} 
                    onDelete={handleDeleteNote}
                    onEdit={handleEditNote}
                  />
                </Grid>
              ))}
            </Grid>
            {notes.totalPages! > 1 && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: 3 
                }}
              >
                <Pagination 
                  count={notes.totalPages} 
                  page={page} 
                  onChange={handleChangePage} 
                  color="primary" 
                />
              </Box>
            )}
          </>
        )}
      </Box>
      <MessageSnackbar
        {...messageSnackbarAttributes}
        onClose={() => setMessageSnackbarAttributes(prev => ({ ...prev, open: false }))}
      />
      <AddNote
        setMessageSnackbarAttributes={setMessageSnackbarAttributes}
      />
      {editingNote && (
        <EditNote
          note={editingNote}
          open={editingNote === null ? false : true}
          onClose={handleCloseEditModal}
          setMessageSnackbarAttributes={setMessageSnackbarAttributes}
        />
      )}
    </>
  );
};

export default NoteListView;