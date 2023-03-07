import { render, screen } from '@testing-library/react';
import { SignIn } from "../pages/SignIn";

test(' ログイン画面に必要なコンポーネントが存在するかどうか', () => {
  render(<SignIn />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
describe('ログイン画面に必要なコンポーネントが存在するかどうか', () => {
    test('two plus two is four', () => {
      expect(2 + 2).toBe(4);
    });
  
    test('two minus one is one', () => {
      expect(2 - 1).toBe(1);
    });
  });