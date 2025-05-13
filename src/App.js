import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";

import Main from "./components/Main";

let theme = createTheme({
  palette: {
    secondary: {
      main: "#C62828"
    },
    background: {
      default: "#F4F6F8"
    },
    error: {
      main: "#E53935"
    },
    success: {
      main: "#43A047"
    }
  },
  typography: {
    fontFamily: "Roboto"
  }
}, esES);

theme = responsiveFontSizes(theme, { breakpoints: ['sm'] });

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <CssBaseline />
        <Main theme={theme} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
