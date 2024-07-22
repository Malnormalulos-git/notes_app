import React from 'react';
import { Container, ContainerProps, Stack, StackProps } from "@mui/material";

interface FormContainerProps {
  onSubmit: () => void;
  children: React.ReactNode;
  component ?: React.ElementType;
  containerProps?: Omit<ContainerProps, 'component'>;
  stackProps?: Omit<StackProps, 'component' | 'onSubmit'>;
}

const FormContainer = (props: FormContainerProps) => {
  const { onSubmit, children, component = "div", containerProps, stackProps } = props;

  return (
    <Container
      component={component}
      {...containerProps}
    >
      <Stack
        component="form"
        onSubmit={onSubmit}
        {...stackProps}
      >
        {children}
      </Stack>
    </Container>
  );
}

export default FormContainer;