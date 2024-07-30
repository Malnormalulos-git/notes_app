import { useEffect } from "react";
import { useEditNote } from "../api/notesAppComponents";
import { MessageSnackbarAttributes } from "./MessageSnackbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormSubmitButton from "./form/FormSubmitButton";
import NoteFormContainer from "./form/Note/NoteFormContainer";
import { useQueryClient } from "@tanstack/react-query";
import { NoteDto } from "../api/notesAppSchemas";
import NoteFormModal from "./form/Note/NoteFormModal";
import NoteTitleTextField from "./form/Note/NoteTitleTextField";
import NoteContentTextField from "./form/Note/NoteContentTextField";
import { Typography } from "@mui/material";
import InfoText from "./form/Note/InfoTest";

const validationSchema = z
  .object({
    noteTitle: z
      .string()
      .min(1, { message: "Title is required" }),
      noteContent: z
      .string()
      .min(1, { message: "Content is required" })
  });

type ValidationSchema = z.infer<typeof validationSchema>;

interface EditNoteProps {
  note: NoteDto;
  open: boolean;
  onClose: () => void;
  setMessageSnackbarAttributes: React.Dispatch<React.SetStateAction<MessageSnackbarAttributes>>;
}

const EditNote = ({ note, open, onClose, setMessageSnackbarAttributes }: EditNoteProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useEditNote({
    onSuccess: () => {
      setMessageSnackbarAttributes({
        open: true, 
        message: "Note successfully modified", 
        severity: "success"
      });
      queryClient.invalidateQueries();
      onClose();
      reset();
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
    reset,
    setValue
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (note) {
      setValue("noteTitle", note.title!);
      setValue("noteContent", note.body!);
    }
  }, [note, setValue]);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutate({
      body: {
        id: note.id!,
        title: data.noteTitle,
        body: data.noteContent
      }
    });
  }

  return (
    <NoteFormModal
      title="Edit Note"
      open={open}
      onClose={onClose}
    >
      <NoteFormContainer
        onSubmit={handleSubmit(onSubmit)}
      >
      <InfoText
        text={"Created: " + new Date(note.createdAt!).toLocaleString()}
      />
      <InfoText
        text={"Updated: " + new Date(note.lastUpdatedAt!).toLocaleString()}
      />
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
          text="Update"
        />
      </NoteFormContainer>
    </NoteFormModal>
  );
}

export default EditNote;