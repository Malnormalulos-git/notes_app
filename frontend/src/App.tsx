import { Container } from "@mui/material";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const App = () => {

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header/>
      {/* <LoginPage/> */}
      {/* <RegisterPage/> */}
      <HomePage/>
    </Container>
  );
}

export default App
