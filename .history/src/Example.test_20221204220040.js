import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/SignIn";

it("必要なコンポーネントが存在するかどうか", () => {
  render(<SignIn />, { wrapper: BrowserRouter });
  const formElement = screen.getByRole("textbox");
  expect(formElement).toBeInTheDocument();
  const labeladdresElement = screen.getByLabelText("メールアドレス");
  expect(labelElement).toBeInTheDocument();
});
