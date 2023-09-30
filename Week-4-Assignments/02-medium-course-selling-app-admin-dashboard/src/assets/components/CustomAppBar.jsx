import { Link } from "react-router-dom";
import theme from "./Theme";
import { ThemeProvider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
const CustomAppBar = () => {
  return (
    <>
      <div className="row">
        <div className="col-1">
          <ThemeProvider theme={theme}>
            <Typography variant="h4" className="m-2">
              Udemy
            </Typography>
          </ThemeProvider>
        </div>
        <div className="col-11 d-flex justify-content-end">
          <Link to="/user/signup">
            <Button className="m-2" variant="outlined">
              Sign Up
            </Button>
          </Link>
          <Link to="/user/login">
            <Button className="m-2" variant="outlined">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default CustomAppBar;
