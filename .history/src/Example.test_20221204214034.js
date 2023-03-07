import { render, screen } from "@testing-library/react";
import { SignIn } from "./pages/SignIn";

it("必要なコンポーネントが存在するかどうか", () => {
  render(<SignIn />);
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});

