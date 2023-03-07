import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/SignIn";

it("必要なコンポーネントが存在するかどうか", () => {
  render(<SignIn />, { wrapper: BrowserRouter });
  const formElement = screen.getByRole("textbox");
  expect(formElement).toBeInTheDocument();
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
  const appTextElement = screen.getByText("メールアドレス");
  expect(appTextElement).toBeInTheDocument();
  const appTextElement2 = screen.getByText("メールアドレス");
  expect(appTextElement2).toBeInTheDocument();
});
