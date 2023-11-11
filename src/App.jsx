import "./App.css";
import { ThemeProvider } from "./components";
import Router from "./routes/Router";

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
