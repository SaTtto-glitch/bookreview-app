import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Edituser } from "../pages/Edituser";
import { NewBooks } from "../pages/NewBooks";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route index element={<Home />} />
        <Route path="/edituser" element={<Edituser />} />
        <Route path="/newbooks" element={<NewBooks />} />
        <Route path="/books/:bookId" element={<Book />} />
        <Route path="/books/:bookId/edit" element={<EditBooks />} />
      </Routes>
    </div>
  );
};
