import { useState } from "react";
import Card from "@mui/material/Card";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Logout from "./Logout";
import { useParams } from "react-router-dom";
const UpdateCourse = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [imageLink, setImageLink] = useState();
  const [validation, showValidation] = useState(false);
  const [message, showMessage] = useState("");
  const { courseId } = useParams();
  const handleUpdate = () => {
    const key = localStorage.getItem("username");
    // console.log(`Authorization : Bearer ${key}`);
    fetch(`http://localhost:3001/admin/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink,
      }),
    })
      .then((response) => {
        showValidation(true);
        if (response.status == 200) {
          showMessage("Course Updated Successfully!");
          return response.json();
        } else if (response.status == 400)
          showMessage("Fill all the required information!");
        else if (response.status == 401) showMessage("Token not Found!");
        else showMessage("Wrong token Credentials!");
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <div
        className="container-fluid d-flex flex-column min-vh-100"
        style={{
          background: "#eeeeee",
        }}
      >
        <Logout />
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-4">
            <Typography variant="h5" className="mb-3">
              Enter details to update the Course.
            </Typography>
            <Card
              variant="outlined"
              style={{
                padding: "1rem",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <TextField
                fullWidth
                id="standard-basic"
                label="Title"
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <TextField
                fullWidth
                id="standard-basic"
                label="Description"
                variant="standard"
                className="mt-2 mb-2"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <TextField
                fullWidth
                id="standard-basic"
                label="Price"
                variant="standard"
                onChange={(e) => setPrice(e.target.value)}
                className="mb-2"
              />
              <br />
              <TextField
                fullWidth
                id="standard-basic"
                label="Image Link"
                variant="standard"
                className="mb-4"
                onChange={(e) => setImageLink(e.target.value)}
              />
              <br />
              <Button className="m-2" variant="outlined" onClick={handleUpdate}>
                Update Course
              </Button>

              <Button
                className="m-2"
                variant="outlined"
                onClick={() => window.location.replace("/courses")}
              >
                Go to Courses
              </Button>
              {validation && <p className="m-2 text-danger">{message}</p>}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
