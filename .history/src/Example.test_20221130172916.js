import { render, screen } from "react-testing-library";
import { SignIn } from "./pages/SignIn";

test("必要なコンポーネントが存在するかどうか", () => {
  render(<SignIn />);
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});
