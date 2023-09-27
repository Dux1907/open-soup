import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { ThemeProvider, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import theme from "./Theme";
const Signup = () => {
    
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
                <div className="row">
                    <div className="col-1">
                    <ThemeProvider theme={theme}>
                            <Typography variant="h4" className="m-2">
                                Udemy
                            </Typography>
                        </ThemeProvider>
                    </div>

                    <div className="col-11 d-flex justify-content-end">
                        <Link to="/signup">
                            <Button className="m-2" variant="outlined">
                                Sign Up
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button className="m-2" variant="outlined">
                                Log In
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center text-center flex-grow-1">
                    <div className="col-lg-4 col-md-7 col-sm-9 col-10">
                        <Typography variant="h5">Welcome to Udemy.</Typography>
                        <Typography variant="h5" className="mb-3">
                            Sign up to create your free account.
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
                            <Button variant="outlined">Sign Up</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Signup;
