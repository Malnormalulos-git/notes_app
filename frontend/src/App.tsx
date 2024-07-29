import { Container } from "@mui/material";
import AppRouter from "./router/AppRouter";

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
      <AppRouter/>
    </Container>
  );
}

export default App
