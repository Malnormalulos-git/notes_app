import { Box, Fab, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import {Add as AddIcon, Close as CloseIcon} from "@mui/icons-material";
import { useCreateNote } from "../api/notesAppComponents";
import MessageSnackbar from "./MessageSnackbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormSubmitButton from "./form/FormSubmitButton";
import NoteFormContainer from "./form/NoteFormContainer";
import { useQueryClient } from "@tanstack/react-query";

const validationSchema = z
  .object({
    noteTitle: z
      .string()
      .min(1, { message: "Title is required" }),
    noteBody: z
      .string()
      .min(1, { message: "Content is required" })
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const AddNote = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [queryError, setQueryError] = useState("");

  const queryClient = useQueryClient();

  const {mutate} = useCreateNote({
    onSuccess: (response) => {
      console.log("Success " + response);
      queryClient.invalidateQueries();
      setOpenModal(false);
      reset(); 
    },
    onError: (e) => { 
      console.log(e);
      setQueryError(`${e?.message}: ${e?.stack.payload || e?.stack.title || e?.name}.`);
      setOpenErrorSnackbar(true);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutate({
      body: {
        title: data.noteTitle,
        body: data.noteBody
      }
    })
  }

  return (
    <>
      <Tooltip 
        onClick={() => setOpenModal(true)}
        title="Add"
        sx={{position:"fixed", bottom: 25, right: {xs:"calc(50% - 25px)", sm:30}}}
      >
        <Fab
            color="primary"
            aria-label="add"
        >
            <AddIcon/>
        </Fab>
    </Tooltip>
    <Modal
        open={openModal}
        onClose={handleCloseModal}
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
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ mb: 2 }}
          >
            Create New Note
          </Typography>
          <NoteFormContainer
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register("noteTitle")}
              helperText={errors.noteTitle?.message}
              error={errors.noteTitle === undefined ? false : true}
              id="noteTitle"
              fullWidth
              label="Title"
              margin="normal"
            />
            <TextField
              {...register("noteBody")}
              helperText={errors.noteBody?.message}
              error={errors.noteBody === undefined ? false : true}
              id="noteBody"
              fullWidth
              label="Content"
              margin="normal"
              multiline
              rows={9}
            />
            <FormSubmitButton
              text="Create"
            />
          </NoteFormContainer>
        </Box>
      </Modal>
    <MessageSnackbar
      severity="error"
      open={openErrorSnackbar}
      message={queryError}
      onClose={() => setOpenErrorSnackbar(false)}
    />
    </>
  );
}

export default AddNote;