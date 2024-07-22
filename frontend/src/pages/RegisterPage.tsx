import { Container, Stack } from "@mui/material";
import { useState } from "react";
import PasswordTextField from "../components/form/PasswordTextField";
import EmailTextField from "../components/form/EmailTextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "../api/notesAppComponents";
import FormSubmitButton from "../components/form/FormSubmitButton";
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
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const RegisterPage = () => {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [queryError, setQueryError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const {mutate} = useRegister({
    onSuccess: (response) => {  // TODO
      console.log("Success " + response);
    //   navigate("/login");
    },
    onError: (e) => { 
      console.log(e);
      setQueryError(`${e.message}: ${e.stack.payload || e.stack.title || e.name}.`);
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
    <Container
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Stack 
        component="form"
        width="30ch"
        spacing={2}
        mb="8rem"
        onSubmit={handleSubmit(onSubmit)}
      >
        <EmailTextField
          register={register("email")}
          helperText={errors.email?.message}
          error={errors.email === undefined ? false : true}
        />
        <PasswordTextField
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          register={register("password")}
          helperText={errors.password?.message}
          error={errors.password === undefined ? false : true}
        />
        <PasswordTextField
          id="confirmPassword"
          label="Confirm password"
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          register={register("confirmPassword")}
          helperText={errors.confirmPassword?.message}
          error={errors.confirmPassword === undefined ? false : true}
        />
        <FormSubmitButton
          text="Register"
        />
      </Stack>
    </Container>
    <MessageSnackbar
      severity="error"
      open={openErrorSnackbar}
      message={queryError}
      onClose={() => setOpenErrorSnackbar(false)}
    />
    </>
  );
}

export default RegisterPage;