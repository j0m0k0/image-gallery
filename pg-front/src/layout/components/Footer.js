import { makeStyles } from "@material-ui/styles";
import CoffeeMugImage from "../../assets/coffee-mug.png";
const useStyles = makeStyles(() => ({
  root: {
    borderTop: "1px solid #c4c4c4",
    // You should not use width 100% here
    // Instead use left and right
    // Great lesson for today!
  },
  coffeeBadge: {
    height: "40px",
    verticalAlign: "middle",
  },
}));

const Footer = () => {
  const s = useStyles();
  return (
    <footer className={s.root}>
      <p className="center">
        ساخته شده با{" "}
        <span>
          <img
            title="فنجون قهوه"
            src={CoffeeMugImage}
            alt="عکس فنجون قهوه"
            className={s.coffeeBadge}
          />
        </span>{" "}
        توسط <a href="https://github.com/j0m0k0">j0m0k0</a>
      </p>
    </footer>
  );
};

export default Footer;
