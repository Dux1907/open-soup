import { Routes, Route } from "react-router-dom";
import Signup from "./assets/components/Signup";
import Login from "./assets/components/Login";
import AddCourses from "./assets/components/addCourses";
import Courses from './assets/components/Courses'
import UpdateCourse from "./assets/components/UpdateCourse";

const App = () => {
  return (
    <>
          <Routes>
        <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path = 'courses' element = {<Courses/>}></Route>
              <Route path='/addcourses' element={<AddCourses />}></Route>
              <Route path = '/updatecourse/:courseId' element = {<UpdateCourse />}></Route>
      </Routes>
    </>
  );
};

export default App;
