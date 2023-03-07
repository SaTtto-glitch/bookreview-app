import { render, screen } from '@testing-library/react';
import { SignIn } from "../pages/SignIn";

test(' ログイン画面に必要なコンポーネントが存在するかどうか', () => {
  render(<SignIn />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});