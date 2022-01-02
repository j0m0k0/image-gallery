import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    position: "relative",
  },
  child: {
    minHeight: "calc(100vh - 57px)",
    // padding: "10px",
    zIndex: 9,
  },
  header: {
    borderBottom: "1px solid #c4c4c4",
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
    padding: "10px 0",
  },
}));

const Layout = ({ children }) => {
  const s = useStyles();
  const isLoggedIn = useSelector((state) => state.general.isLoggedIn);

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Header isLoggedIn={isLoggedIn} />
      </div>
      <Container className={s.child}>{children}</Container>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        rtl
      />
    </div>
  );
};

export default Layout;
