import RTL from "./RTL";
import theme from "./theme";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { checkLogin } from "./redux/generalSlice";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(checkLogin());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RTL>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
