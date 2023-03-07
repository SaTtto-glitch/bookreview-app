import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/SignIn";

it("必要なコンポーネントが存在するかどうか", () => {
  render(<SignIn />, { wrapper: BrowserRouter });
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});
