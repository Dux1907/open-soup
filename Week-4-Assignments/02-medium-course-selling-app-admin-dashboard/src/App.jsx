import { Routes, Route } from "react-router-dom";
import SignupAdmin from "./assets/components/Admin/Signup";
import LoginAdmin from "./assets/components/Admin/Login";
import AddCourses from "./assets/components/Admin/AddCourses";
import CoursesAdmin from "./assets/components/Admin/Courses";
import UpdateCourse from "./assets/components/Admin/UpdateCourse";
import SignupUser from "./assets/components/Users/Signup";
import LoginUser from "./assets/components/Users/Login";
import CoursesUser from './assets/components/Users/Courses'
import PurchasedCourses from "./assets/components/Users/PurchasedCourses";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/signup" element={<SignupAdmin />}></Route>
        <Route path="/admin/login" element={<LoginAdmin />}></Route>
        <Route path="/admin/courses" element={<CoursesAdmin />}></Route>
        <Route path="/admin/addcourses" element={<AddCourses />}></Route>
        <Route
          path="/admin/updatecourse/:courseId"
          element={<UpdateCourse />}
        ></Route>
        <Route path="/user/signup" element={<SignupUser />}></Route>

        <Route path="/user/login" element={<LoginUser />}></Route>
        <Route path='/user/courses' element={<CoursesUser />}></Route>
        <Route path = '/user/purchasedcourses' element = {<PurchasedCourses/>}></Route>
        <Route path="*" element={<SignupUser />}></Route>
      </Routes>
    </>
  );
};

export default App;
