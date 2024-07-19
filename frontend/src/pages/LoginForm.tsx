import { Alert, Box, Button, Snackbar, Stack } from "@mui/material";
import { useState } from "react";
import PasswordTextField from "../components/PasswordTextField";
import EmailTextField from "../components/EmailTextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogIn } from "../api/notesAppComponents";
import setAccessToken from "../shared/setAccessToken";
import FormSubmitButton from "../components/FormSubmitButton";
import MessageSnackbar from "../components/MessageSnackbar";

const validationSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email( { message: "Must be a valid email"}),
    password: z
      .string()
      .min(10, { message: "Password must be at least 10 characters" })
      .regex(/[a-z]/, { message: "Password must have at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must have at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must have at least one digit" }),
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const LoginForm = () => {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const {mutate} = useLogIn({
    onSuccess: (response) => {  // TODO
      console.log("Success " + response);
      setAccessToken(response.token);
    //   navigate("/");
    },
    onError: (e) => { 
      console.log(e);
      setFetchError(`${e.message}: ${e.stack.payload || e.stack.title || e.name}.`);
      setOpenErrorSnackbar(true);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutate({
      body: {
        email: data.email,
        password: data.password
      }
    })
  }

  return (
    <>
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10em'
      }}
    >
      <Stack 
        component="form"
        width="30ch"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <EmailTextField
          register={register("email")}
          helperText={errors.email?.message}
          error={errors.email === undefined ? false : true}
        />
        <PasswordTextField
          register={register("password")}
          helperText={errors.password?.message}
          error={errors.password === undefined ? false : true}
        />
        <FormSubmitButton
          text="Login"
        />
      </Stack>
    </Box>
    <MessageSnackbar
      severity="error"
      open={openErrorSnackbar}
      message={fetchError}
      onClose={() => setOpenErrorSnackbar(false)}
    />
    </>
  );
}

export default LoginForm;