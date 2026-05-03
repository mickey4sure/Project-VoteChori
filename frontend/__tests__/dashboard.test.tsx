import { render, screen } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '@/components/AuthProvider';
import '@testing-library/jest-dom';

// Mock child components that might have complex logic or external dependencies
jest.mock('@/components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('@/components/Footer', () => () => <div data-testid="footer" />);
jest.mock('@/components/AvrSimulator', () => () => <div data-testid="avr-simulator" />);
jest.mock('@/components/AuthProvider', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: () => ({ user: { email: 'test@example.com' }, loading: false })
}));

describe('Dashboard Page', () => {
  const renderDashboard = () => {
    return render(
      <LanguageProvider>
        <AuthProvider>
          <DashboardPage />
        </AuthProvider>
      </LanguageProvider>
    );
  };

  it('renders the dashboard header and welcome message', () => {
    renderDashboard();
    expect(screen.getByText(/Tactical Overview/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Command Center/i })).toBeInTheDocument();
  });

  it('displays the correct number of quick action cards', () => {
    renderDashboard();
    const actions = [
      'ChoriGuard AI',
      'Booth Locator',
      'Training Modules',
      'Knowledge Arena'
    ];
    actions.forEach(action => {
      expect(screen.getByText(action)).toBeInTheDocument();
    });
  });

  it('renders the integrated AVR Simulator widget', () => {
    renderDashboard();
    expect(screen.getByTestId('avr-simulator')).toBeInTheDocument();
  });

  it('shows the readiness status verified badge', () => {
    renderDashboard();
    const integrityElements = screen.getAllByText(/Integrity/i);
    expect(integrityElements.length).toBeGreaterThan(0);
    const verifiedElements = screen.getAllByText(/Verified/i);
    expect(verifiedElements.length).toBeGreaterThan(0);
  });
});
