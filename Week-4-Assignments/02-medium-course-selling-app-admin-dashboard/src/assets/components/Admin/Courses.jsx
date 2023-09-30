import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Logout from "./Logout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Courses = () => {
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/admin/courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("username"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(true);
      });
  }, [courses]);
  return (
    <>
      {loading && (
        <div style={{ background: "#eeeeee" }}>
          <Logout />
          <div className="container-fluid min-vh-100">
            <div className="row text-center justify-content-center">
              <h1>Available Courses :</h1>
              {courses.map((item) => {
                const url = `/admin/updatecourse/${item._id}`;
                return (
                  <>
                    <div className="col-3 mt-4">
                      <Card
                        className="m-2"
                        variant="outlined"
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          height: "400px",
                        }}
                      >
                        <h4 className="m-2">{item.title}</h4>
                        <img
                          className="img-fluid"
                          src={item.imageLink}
                          alt="HTML"
                        ></img>
                        <h5 className="m-2">${item.price}</h5>
                        <h5>{item.description}</h5>
                        <Link to={url}>
                          <Button className="mb-2" variant="outlined">
                            Update Course
                          </Button>
                        </Link>
                      </Card>
                    </div>
                  </>
                );
              })}
              <div className="col-12">
                <Link to="/admin/addcourses">
                  <Button
                    style={{ width: "9.5%" }}
                    className="m-2"
                    variant="contained"
                  >
                    Add Course
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
