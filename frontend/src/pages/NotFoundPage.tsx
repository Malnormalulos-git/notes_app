import { Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { HOME_ROUTE } from '../router/routes';

const NotFoundPage = () => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <Typography 
        variant="h1" 
        component="h1" 
        gutterBottom
      >
        404
      </Typography>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom
      >
        Page not found
      </Typography>
      <Typography 
        variant="body1" 
        gutterBottom
      >
        Sorry, the page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        component={RouterLink}
        to={HOME_ROUTE}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Back to the home page
      </Button>
    </Stack>
  );
};

export default NotFoundPage;