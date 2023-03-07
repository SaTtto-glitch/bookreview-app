import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Edituser } from "../pages/Edituser";
import { NewBooks } from "../pages/NewBooks";
import { Books } from "../pages/Books";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={auth ? <Navigate replace to="/" /> : <SignIn />} />
        <Route path="/signup" element={auth ? <Navigate replace to="/" /> : <SignUp />} />
        <Route index element={<Home />} />
        <Route path="/books/:id" element={<Books />} />

        {auth ? (
          <>
            <Route path="/edituser" element={<Edituser />} />
            <Route path="/newbooks" element={<NewBooks />} />
          </>
        ) : (
          <></>
        )}
      </Routes>
    </div>
  );
};
