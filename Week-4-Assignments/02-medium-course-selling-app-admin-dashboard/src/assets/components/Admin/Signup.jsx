import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import CustomAppBar from "../CustomAppBar";
import { useState } from "react";
const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validation, showValidation] = useState(false);
  const [message, showMessage] = useState("");
  const signUpValidation = () => {
    const req = {
      username,
      password,
    };
    fetch("http://localhost:3001/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then((response) => {
      showValidation(true);
      if (response.status == 403) showMessage("User already exists!");
      else showMessage("User Created Successfully!");
    });
  };
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
              Sign up to create your account.
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
                onChange={(e) => {
                  console.log(e);
                  setUsername(e.target.value);
                }}
              />
              <br />
              <TextField
                fullWidth
                id="standard-basic"
                label="Password"
                variant="standard"
                className="mt-2 mb-4"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button onClick={signUpValidation} variant="outlined">
                Sign Up
              </Button>
              {validation && <p className="m-2 text-danger">{message}</p>}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
