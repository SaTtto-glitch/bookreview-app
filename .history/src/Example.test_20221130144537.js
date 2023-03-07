import { render, screen } from "@testing-library/react";
import { SignIn } from "../pages/SignIn";

describe("ログイン画面", () => {
  test("必要なコンポーネントが存在するかどうか", () => {
    render(<SignIn />);
    const headElement = screen.getByRole('heading', { name: 'Hello' });
    expect(headElement).toBeInTheDocument();
  });

  test("two minus one is one", () => {
    expect(2 - 1).toBe(1);
  });
});
