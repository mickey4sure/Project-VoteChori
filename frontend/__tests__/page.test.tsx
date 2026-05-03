import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import '@testing-library/jest-dom';

// Mock Language Context
jest.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'en',
  }),
}));

// Mock Auth Context
jest.mock('../components/AuthProvider', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

// Mock Theme Context
jest.mock('../context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

// Mock react-markdown (ESM issue in Jest)
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => <div>{children}</div>,
}));
jest.mock('remark-gfm', () => ({}));

// Mock for next/image — strips Next.js-only props that aren't valid HTML attrs
jest.mock('next/image', () => {
  const MockImage = ({
    alt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    priority,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placeholder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blurDataURL,
    ...props
  }: {
    alt: string;
    priority?: boolean;
    placeholder?: string;
    blurDataURL?: string;
    [key: string]: any;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  );
  MockImage.displayName = 'MockNextImage';
  return MockImage;
});

describe('Landing Page (app/page.tsx)', () => {
  it('renders without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });

  it('contains navigation links', () => {
    render(<Home />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the "Get Started" call to action', () => {
    render(<Home />);
    const startLink = screen.getByText(/get started/i);
    expect(startLink).toBeInTheDocument();
    expect(startLink.closest('a')).toHaveAttribute('href', '/dashboard');
  });

  it('renders the branding text', () => {
    render(<Home />);
    const branding = screen.getAllByText(/VoteChori/i);
    expect(branding.length).toBeGreaterThanOrEqual(1);
  });
});
