import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Edituser } from "../pages/Edituser";
import { NewBooks } from "../pages/NewBooks";
import { EditBooks } from "../pages/EditBooks";
import { Books } from "../pages/Books";

export const Router = () => {
  return (
    <div>
      aa
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route index element={<Home />} />
        <Route path="/edituser" element={<Edituser />} />
        <Route path="/newbooks" element={<NewBooks />} />
        <Route path="/books/:id" element={<Books />} />
        <Route path="/books/:id/edit" element={<EditBooks />} />
      </Routes>
    </div>
  );
};