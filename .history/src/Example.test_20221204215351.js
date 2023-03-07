import { render, screen } from "@testing-library/react";
import { SignIn } from "./pages/SignIn";

test("必要なコンポーネントが存在するかどうか", () => {
  render(<SignIn />, {wrapper: BrowserRouter});
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});

