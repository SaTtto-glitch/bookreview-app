import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";

import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Edituser } from "../pages/Edituser";
import { NewBooks } from "../pages/NewBooks";
import { EditBooks } from "../pages/EditBooks";
import { Books } from "../pages/Books";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route index element={<Home />} />
        <Route path="/books/:id" element={<Books />} />

        {auth ? (
          <>
            <Route path="/books/:id/edit" element={<EditBooks />} />
            <Route path="/edituser" element={<Edituser />} />
            <Route path="/newbooks" element={<NewBooks />} />
            <Route path="/signin" element={<Navigate replace to="/edituser" />} />
            <Route path="/signup" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <></>
        )}
      </Routes>
    </div>
  );
};
