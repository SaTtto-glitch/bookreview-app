import { render, screen } from '@testing-library/react';
import { SignIn } from "../pages/SignIn";

test('ろぐいｎ', () => {
  render(<SignIn />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});