import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from '../components/AuthProvider';
import React from 'react';

// Mock Firebase App
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn((_auth: any, callback: (user: any) => void) => {
    callback({ uid: '123', email: 'test@example.com' });
    return jest.fn();
  }),
  signOut: jest.fn(() => Promise.resolve()),
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({})),
}));

describe('AuthProvider & useAuth', () => {
  it('provides the authenticated user state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual({ uid: '123', email: 'test@example.com' });
    expect(result.current.loading).toBe(false);
  });

  it('successfully calls signOut', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signOut();
    });

    const { signOut } = require('firebase/auth');
    expect(signOut).toHaveBeenCalled();
  });
});
