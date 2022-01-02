import { Button, CircularProgress, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../services/Api";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../redux/generalSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  skeleton: {
    marginLeft: "auto",
  },
}));

const Header = () => {
  const s = useStyles();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.general.isLoggedIn);
  const email = useSelector((state) => state.general.email);
  const dispatch = useDispatch();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    setLogoutLoading(true);
    Api.logout()
      .then(async (res) => {
        toast.success(res.data.message);
        await dispatch(setLogin(false));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLogoutLoading(false);
      });
  };

  const gotoLogin = () => {
    navigate("/login");
  };
  return (
    <Container>
      <Grid container className={s.root}>
        <Grid item md={4} sm={6}>
          <Link to="/">خانه</Link>
        </Grid>

        <Grid item md={4} sm={6} className={"left"}>
          {isLoggedIn === true ? (
            <>
              <span className="ml-20">{email}</span>
              <Button
                variant="outlined"
                disabled={logoutLoading}
                onClick={handleLogout}
              >
                {logoutLoading ? (
                  <CircularProgress className={"loading"} />
                ) : (
                  "خروج"
                )}
              </Button>
            </>
          ) : (
            <Button variant="outlined" onClick={gotoLogin}>
              ورود / عضویت
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
