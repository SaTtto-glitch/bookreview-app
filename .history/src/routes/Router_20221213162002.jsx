import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Edituser } from "../pages/Edituser";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route index element={<Home />} />
        <Route path="/lists/:listId/tasks/:taskId" element={<Edituser />} />
      </Routes>
    </div>
  );
};
