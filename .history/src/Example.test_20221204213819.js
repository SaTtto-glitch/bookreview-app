import { render, screen } from "@testing-library/react";
import { SignIn } from "./pages/SignIn";
import App from './App';

it("必要なコンポーネントが存在するかどうか", () => {
  render(<App />);
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});

