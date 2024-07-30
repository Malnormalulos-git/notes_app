import React from 'react';
import FormContainer from "../FormContainer";
import { StackProps, ContainerProps } from "@mui/material";

interface NoteFormContainerProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

const NoteFormContainer = (props: NoteFormContainerProps) => {
  const { onSubmit, children } = props;
  
  const stackProps: Omit<StackProps, 'component' | 'onSubmit'> = {
    width: "100%",
    spacing: 2,
  };
  
  const containerProps: Omit<ContainerProps, 'component'> = {
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      padding: "0 !important"
    }
  };

  return (
    <FormContainer
      onSubmit={onSubmit}
      stackProps={stackProps}
      containerProps={containerProps}
    >
      {children}
    </FormContainer>
  );
}

export default NoteFormContainer;