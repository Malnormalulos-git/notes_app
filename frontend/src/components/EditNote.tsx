import { useEffect, useMemo } from "react";
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
import InfoTextTypography from "./InfoTestTypography";

const validationSchema = z
  .object({
    noteTitle: z
      .string()
      .min(1, { message: "Title is required" }),
    noteContent: z
      .string()
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
    setValue,
    watch
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (note) {
      setValue("noteTitle", note.title!);
      setValue("noteContent", note.content!);
    }
  }, [note, setValue]);

  const watchedTitle = watch("noteTitle");
  const watchedContent = watch("noteContent");

  const isDisabled = useMemo(() => {
    return note.title === watchedTitle && note.content === watchedContent;
  }, [note.title, note.content, watchedTitle, watchedContent]);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutate({
      body: {
        id: note.id!,
        title: data.noteTitle,
        content: data.noteContent
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
      <InfoTextTypography
        text={
          note.lastUpdatedAt === note.createdAt
            ? `Created: ${new Date(note.createdAt!).toLocaleString()}`
            : `Created: ${new Date(note.createdAt!).toLocaleString()}
               Updated: ${new Date(note.lastUpdatedAt!).toLocaleString()}`
        }
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
          disabled={isDisabled}
        />
      </NoteFormContainer>
    </NoteFormModal>
  );
}

export default EditNote;