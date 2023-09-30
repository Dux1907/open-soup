import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../Theme";
import { Button } from "@mui/material";
const Logout = () => {
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
          <Button
            className="m-2"
            variant="outlined"
            onClick={() => {
              localStorage.setItem("username", null);
              window.location.replace("http://localhost:5173/admin/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Logout;
