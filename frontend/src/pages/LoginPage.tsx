import { useState } from "react";
import PasswordTextField from "../components/form/Auth/PasswordTextField";
import EmailTextField from "../components/form/Auth/EmailTextField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogIn } from "../api/notesAppComponents";
import setAccessToken from "../shared/setAccessToken";
import FormSubmitButton from "../components/form/FormSubmitButton";
import MessageSnackbar from "../components/MessageSnackbar";
import AuthFormContainer from "../components/form/Auth/AuthFormContainer";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../router/routes";
import refreshPage from "../shared/refreshPage";

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

const LoginPage = () => {
  const navigate = useNavigate();

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [queryError, setQueryError] = useState("");

  const {mutate} = useLogIn({
    onSuccess: (response) => {  
      setAccessToken(response.token);
      navigate(HOME_ROUTE);
      refreshPage();
    },
    onError: (e) => { 
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
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
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
      </AuthFormContainer>
    <MessageSnackbar
      severity="error"
      open={openErrorSnackbar}
      message={queryError}
      onClose={() => setOpenErrorSnackbar(false)}
    />
    </>
  );
}

export default LoginPage;