import { createTheme } from "@material-ui/core";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: [
      "dana",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "300px",
        "& input": {
          padding: "10px 5px",
        },
      },
    },
  },
});

export default theme;
