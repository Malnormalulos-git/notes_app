import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { CommonTextFieldProps } from "../shared/interfaces/CommonTextFieldProps";

interface PasswordTextFieldProps extends CommonTextFieldProps {
  showPassword?: boolean;
  label?: string;
  handleClickShowPassword?: () => void;
}

const PasswordTextField = (props: PasswordTextFieldProps) => {
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  
  const { showPassword : externalShowPassword, 
          label : externalLabel, 
          id, 
          handleClickShowPassword : externalHandleClickShowPassword,
          register, 
          helperText,
          error
        } = props;
  
  const label = externalLabel !== undefined ? externalLabel : "Password";
  const showPassword = externalShowPassword !== undefined ? externalShowPassword : internalShowPassword;
  const handleClickShowPassword = externalHandleClickShowPassword || (() => {
    setInternalShowPassword(!internalShowPassword);
  });

  return (
    <TextField
          id={id}
          label={label}
          type={showPassword ? "text" : "password"}
          {...register}
          error={error}
          helperText={helperText}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
  );
}

export default PasswordTextField;