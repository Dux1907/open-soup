import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Logout from "./Logout";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
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
  return (
    <>
      {loading && (
        <div style={{ background: "#eeeeee" }}>
          <Logout />
          <div className="container-fluid min-vh-100">
            <div className="row text-center justify-content-center">
              <h1>Purchased Courses :</h1>
              {purchasedCourses.map((item) => {
                return (
                  <>
                    <div className="col-3 mt-4">
                      <Card
                        className="m-2"
                        variant="outlined"
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          height: "350px",
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
                      </Card>
                    </div>
                  </>
                );
              })}
              <div className="col-12">
                <Link to="/user/courses">
                  <Button
                    style={{ width: "9.5%" }}
                    className="m-3"
                    variant="contained"
                  >
                    All Courses
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

export default PurchasedCourses;
