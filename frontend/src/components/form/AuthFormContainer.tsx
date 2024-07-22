import React from 'react';
import FormContainer from "./FormContainer";
import { StackProps, ContainerProps } from "@mui/material";

interface AuthFormContainerProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

const AuthFormContainer = (props: AuthFormContainerProps) => {
  const { onSubmit, children } = props;
  
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