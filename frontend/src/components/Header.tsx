import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from './Logo';

const Header = () => {
  return (
    <AppBar position="static">
      <Container 
        maxWidth={false}
      >
        <Toolbar disableGutters>
          <Logo/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu" // TODO
            sx={{
              mx: 2,
              display: { xs: 'none', sm: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Notes
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;