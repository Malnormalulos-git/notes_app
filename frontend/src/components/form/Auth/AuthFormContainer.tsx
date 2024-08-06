import FormContainer from "../FormContainer";
import { StackProps, ContainerProps } from "@mui/material";
import { CommonFormContainerProps } from '../../../interfaces/CommonFormContainerProps';

interface AuthFormContainerProps extends CommonFormContainerProps { }

const AuthFormContainer = ({ onSubmit, children } : AuthFormContainerProps) => {  
  const stackProps: Omit<StackProps, 'component' | 'onSubmit'> = {
    width: "30ch",
    spacing: 2,
    mb: "8rem"
  };
  
  const containerProps: Omit<ContainerProps, 'component'> = {
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
  };

  return (
    <FormContainer
      onSubmit={onSubmit}
      component="main"
      stackProps={stackProps}
      containerProps={containerProps}
    >
      {children}
    </FormContainer>
  );
}

export default AuthFormContainer;