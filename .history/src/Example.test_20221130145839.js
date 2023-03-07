import { render, screen } from "@testing-library/react";
import { SignIn } from "../pages/SignIn";

describe("ログイン画面", () => {
  test("必要なコンポーネントが存在するかどうか", () => {
    render(<SignIn />);
    const headElement = screen.getByRole('form');
    expect(headElement).toBeInTheDocument();
  });
});
