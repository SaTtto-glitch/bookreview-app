import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Edituser } from "../pages/Edituser";
import { EditBooks } from "../pages/Editbooks";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route index element={<Home />} />
        <Route path="/edituser" element={<Edituser />} />
        <Route path="/editbooks" element={<EditBooks />} />
      </Routes>
    </div>
  );
};
