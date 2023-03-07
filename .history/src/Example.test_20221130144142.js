import { render, screen } from "@testing-library/react";
import { SignIn } from "../pages/SignIn";

describe("ログイン画面に必要なコンポーネントが存在するかどうか", () => {
  test("two plus two is four", () => {
    render(<SignIn />);
    const element = screen.getByText("Hello");
    expect(element).toBeInTheDocument();
  });

  test("two minus one is one", () => {
    expect(2 - 1).toBe(1);
  });
});
