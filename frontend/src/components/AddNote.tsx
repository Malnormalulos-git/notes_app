import { Fab, Tooltip } from "@mui/material";
import { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { useCreateNote } from "../api/notesAppComponents";
import { MessageSnackbarAttributes } from "./MessageSnackbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormSubmitButton from "./form/FormSubmitButton";
import NoteFormContainer from "./form/Note/NoteFormContainer";
import { useQueryClient } from "@tanstack/react-query";
import NoteFormModal from "./form/Note/NoteFormModal";
import NoteTitleTextField from "./form/Note/NoteTitleTextField";
import NoteContentTextField from "./form/Note/NoteContentTextField";

const validationSchema = z
  .object({
    noteTitle: z
      .string()
      .min(1, { message: "Title is required" }),
    noteContent: z
      .string()
  });

type ValidationSchema = z.infer<typeof validationSchema>;

interface AddNoteProps {
  setMessageSnackbarAttributes: React.Dispatch<React.SetStateAction<MessageSnackbarAttributes>>;
}

const AddNote = ({setMessageSnackbarAttributes} : AddNoteProps) => {
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const queryClient = useQueryClient();

  const {mutate} = useCreateNote({
    onSuccess: () => {
      queryClient.invalidateQueries();
      setOpenModal(false);
      reset();
      setMessageSnackbarAttributes({
        open: true, 
        message: "Note successfully created", 
        severity: "success"
      });
    },
    onError: (e) => { 
      setMessageSnackbarAttributes({
        open: true, 
        message: `${e?.message}: ${e?.stack.payload || e?.stack.title || e?.name}.`, 
        severity: "error"
      });
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
        content: data.noteContent
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
      <NoteFormModal
        title="Create New Note"
        open={openModal}
        onClose={handleCloseModal}
      >
        <NoteFormContainer
          onSubmit={handleSubmit(onSubmit)}
        >
          <NoteTitleTextField
            register={register("noteTitle")}
            helperText={errors.noteTitle?.message}
            error={errors.noteTitle === undefined ? false : true}
          />
          <NoteContentTextField
            register={register("noteContent")}
            helperText={errors.noteContent?.message}
            error={errors.noteContent === undefined ? false : true}
          />
          <FormSubmitButton
            text="Create"
          />
        </NoteFormContainer>
      </NoteFormModal>
    </>
  );
}

export default AddNote;