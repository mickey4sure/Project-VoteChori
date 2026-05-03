import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AvrSimulator from '../components/AvrSimulator';
import '@testing-library/jest-dom';

// Increase timeout for the multi-stage simulation
jest.setTimeout(15000);

// Mock scrollIntoView for jsdom
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('AvrSimulator', () => {
  it('renders the initial state correctly', () => {
    render(<AvrSimulator />);
    expect(screen.getByText(/Identity Verification/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mock Aadhaar Number/i)).toBeInTheDocument();
  });

  it('allows entering a 12-digit Aadhaar number', () => {
    render(<AvrSimulator />);
    const input = screen.getByLabelText(/Mock Aadhaar Number/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '123456789012' } });
    expect(input.value).toBe('123456789012');
  });

  it('completes the simulation flow successfully', async () => {
    render(<AvrSimulator />);
    const input = screen.getByLabelText(/Mock Aadhaar Number/i);
    fireEvent.change(input, { target: { value: '123456789012' } });
    
    const button = screen.getByRole('button', { name: /Execute Protocol/i });
    fireEvent.click(button);

    // Verify terminal headers appear
    expect(screen.getByText(/Secure Node:/i)).toBeInTheDocument();

    // Wait for the final EPIC-ID card to appear
    await waitFor(() => {
      expect(screen.getByText(/EPIC-ID Generation Successful/i)).toBeInTheDocument();
    }, { timeout: 12000 });

    // Verify the Voter ID card content
    expect(screen.getByText(/EX-VC-9012/i)).toBeInTheDocument();
    expect(screen.getByText(/Protocol Success/i)).toBeInTheDocument();
  });

  it('resets correctly after success', async () => {
    render(<AvrSimulator />);
    const input = screen.getByLabelText(/Mock Aadhaar Number/i);
    fireEvent.change(input, { target: { value: '123456789012' } });
    fireEvent.click(screen.getByRole('button', { name: /Execute Protocol/i }));

    await waitFor(() => {
      expect(screen.getByText(/Protocol Success/i)).toBeInTheDocument();
    }, { timeout: 12000 });

    const refreshBtn = screen.getByRole('button', { name: /Run New Simulation/i });
    fireEvent.click(refreshBtn);

    expect(screen.getByText(/Identity Verification/i)).toBeInTheDocument();
  });
});
