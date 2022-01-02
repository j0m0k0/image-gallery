import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <Grid container>
      <Helmet>
        <title>صفحه یافت نشد</title>
      </Helmet>
      <Grid item>
        <p className="center">متاسفیم! صفحه مورد نظر پیدا نشد</p>
      </Grid>
    </Grid>
  );
};

export default NotFound;
