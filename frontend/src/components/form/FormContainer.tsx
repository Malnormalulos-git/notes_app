import React from 'react';
import { Container, ContainerProps, Stack, StackProps } from "@mui/material";
import { CommonFormContainerProps } from '../../interfaces/CommonFormContainerProps';

interface FormContainerProps extends CommonFormContainerProps{
  component ?: React.ElementType;
  containerProps?: Omit<ContainerProps, 'component'>;
  stackProps?: Omit<StackProps, 'component' & 'onSubmit'>;
}

const FormContainer = (props: FormContainerProps) => {
  const { onSubmit, 
          children, 
          component = "div", 
          containerProps, 
          stackProps 
        } = props;

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