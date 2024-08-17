import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from './Logo';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../router/routes';
import { Box } from '@mui/material';
import getAccessToken from '../shared/getAccessToken';
import logOut from '../shared/logOut';
import refreshPage from '../shared/refreshPage';
import SearchBar from './SearchBar';

const Header = () => {
  const handleLogout = () => {
    logOut();
    refreshPage();
  }

  return (
    <> 
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box
                component={RouterLink}
                to={HOME_ROUTE}
                sx={{
                  color: 'inherit',
                  textDecoration: "none",
                  display: "flex"
                }}
              >
                <Logo/>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mx: 2,
                    display: { xs: 'none', sm: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                  }}
                >
                  Notes
                </Typography>
              </Box>
              { getAccessToken() ? 
              (
                <>
                  <SearchBar/>
                  <Box
                    sx={{
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 500,
                      letterSpacing: '0.05rem',
                      cursor: 'pointer',
                      minWidth: { xs: '0', sm: '150px' },
                      display: 'flex',
                      flexDirection: 'row-reverse'
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Box>
                </>
              )
              :
              (<Box
                sx={{
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '0.05rem',
                }}
              >
                <RouterLink to={LOGIN_ROUTE} style={{color: 'inherit', textDecoration: 'none'}}>
                  Login
                </RouterLink>
                {" \\ "}
                <RouterLink to={REGISTER_ROUTE} style={{color: 'inherit', textDecoration: 'none'}}>
                    Register
                </RouterLink> 
              </Box>)
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Header;