import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});

test('renders header with title', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Reddit/i });
  expect(headerElement).toBeInTheDocument();
});

test('renders SearchBar component', () => {
  render(<App />);
  const searchBarElement = screen.getByTestId('search-bar');
  expect(searchBarElement).toBeInTheDocument();
});

test('renders Posts component', () => {
  render(<App />);
  const postsElement = screen.getByTestId('posts');
  expect(postsElement).toBeInTheDocument();
});

test('renders Subreddits component', () => {
  render(<App />);
  const subredditsElement = screen.getByTestId('subreddits');
  expect(subredditsElement).toBeInTheDocument();
});

test('renders scrollToTop button when showScrollButton is true', () => {
  render(<App />);
  const scrollToTopButtonElement = screen.getByTestId('scroll-to-top-button');
  expect(scrollToTopButtonElement).toBeInTheDocument();
});

test('does not render scrollToTop button when showScrollButton is false', () => {
  render(<App />);
  const scrollToTopButtonElement = screen.queryByTestId('scroll-to-top-button');
  expect(scrollToTopButtonElement).not.toBeInTheDocument();
});