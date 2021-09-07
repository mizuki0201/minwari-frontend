import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CookiesProvider>
    </ChakraProvider>
  );
}

export default App;
