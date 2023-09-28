import { Routes, Route } from "react-router-dom";
import Signup from "./assets/components/Signup";
import Login from "./assets/components/Login";
import AddCourses from "./assets/components/addCourses";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path = '/courses' element = {<AddCourses />}></Route>
      </Routes>
    </>
  );
};

export default App;
