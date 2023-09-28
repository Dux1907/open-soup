import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CustomAppBar from "./CustomAppBar";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
const Login = () => {
  return (
    <>
      <div
        className="container-fluid min-vh-100"
        style={{
          background: "#eeeeee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomAppBar />
        <div className="row justify-content-center align-items-center text-center flex-grow-1">
          <div className="col-lg-4 col-md-7 col-sm-9 col-10">
            <Typography variant="h5">Welcome to Udemy.</Typography>
            <Typography variant="h5" className="mb-3">
              Log in to view your account.
            </Typography>
            <Card
              style={{
                height: "220px",
                padding: "1rem",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
              variant="outlined"
            >
              <TextField
                fullWidth
                id="standard-basic"
                label="Username"
                variant="standard"
              />
              <br />
              <TextField
                fullWidth
                id="standard-basic"
                label="Password"
                variant="standard"
                className="mt-2 mb-4"
              />
              <br />
              <Button variant="outlined">Log In</Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
