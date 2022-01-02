import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Formik } from "formik";
import Api from "../../services/Api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setLogin } from "../../redux/generalSlice";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(() => ({
  Form: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiGrid-root": {
      flexBasis: "100%",
    },
  },
}));

const Login = () => {
  const s = useStyles();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.general.isLoggedIn);
  return (
    <>
      {isLoggedIn === false ? (
        <div>
          <Helmet>
            <title>ورود اعضا</title>
          </Helmet>
          <h4>ورود</h4>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              Api.login(values.email, values.password)
                .then(async (res) => {
                  toast.success(res.data.message);
                  await dispatch(setLogin(true));
                  await dispatch(setEmail(res.data.email));
                  navigator("/");
                })
                .catch(async () => {
                  toast.error("Incorrect email / password");
                  await dispatch(setLogin(false));
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className={s.Form}>
                <Grid item md={12} className="mb-20">
                  <TextField
                    type="email"
                    name="email"
                    variant="outlined"
                    label="ایمیل"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
                </Grid>
                <Grid item md={12} className="mb-20">
                  <TextField
                    type="password"
                    name="password"
                    variant="outlined"
                    label="کلمه عبور"
                    autoComplete="off"
                    InputProps={{
                      autoComplete: "off",
                    }}
                    onChange={handleChange}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                </Grid>
                <Grid item md={12} className="mb-20">
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress className={"loading"} />
                    ) : (
                      "ورود"
                    )}
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Login;
