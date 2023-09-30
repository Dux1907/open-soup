import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Logout from "./Logout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Courses = () => {
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/users/purchasedCourses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("username"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPurchasedCourses(data.courses);
        setLoading(true);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/users/courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("username"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCourses(data);
      });
  }, [purchasedCourses]);
  const handleClick = (item) => {
    setPurchasedCourses([...purchasedCourses, item]);
    fetch(`http://localhost:3001/users/courses/${item._id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("username"),
      },
    }).then((response) => {
      response.json();
    });
  };
  return (
    <>
      {loading && (
        <div style={{ background: "#eeeeee" }}>
          <Logout />
          <div className="container-fluid min-vh-100">
            <div className="row text-center justify-content-center">
              <h1>Available Courses :</h1>
              {courses.map((item) => {
                let disable;
                if (purchasedCourses)
                  disable = purchasedCourses.some(
                    (thisOne) => thisOne._id.toString() == item._id
                  );
                else disable = false;
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
                        {disable ? (
                          <p className="mb-2 text-danger">Already Purchased</p>
                        ) : (
                          <Button
                            className="mb-2"
                            variant="outlined"
                            onClick={() => handleClick(item)}
                          >
                            Purchase Course
                          </Button>
                        )}
                      </Card>
                    </div>
                  </>
                );
              })}
              <div className="col-12">
                <Link to="/user/purchasedcourses">
                  <Button
                    style={{ width: "18%" }}
                    className="m-3"
                    variant="contained"
                  >
                    Go to Purchased Courses
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
