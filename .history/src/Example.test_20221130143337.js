import { render, screen } from '@testing-library/react';
import { SignIn } from "../pages/SignIn";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});