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
import { useNavigate, Navigate } from "react-router";
import React from "react";
import { useSelector } from "react-redux";
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

const Register = () => {
  const s = useStyles();
  const navigator = useNavigate();
  const isLoggedIn = useSelector((state) => state.general.isLoggedIn);

  return (
    <>
      {isLoggedIn === false ? (
        <div>
          <Helmet>
            <title>عضویت</title>
          </Helmet>
          <h4>عضویت</h4>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              Api.register(values.email, values.password)
                .then(async (res) => {
                  toast.success(res.data.message);
                  navigator("/");
                })
                .catch(async () => {
                  toast.error("Incorrect email / password");
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
                      "عضویت"
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

export default Register;
