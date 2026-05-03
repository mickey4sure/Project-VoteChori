import React from 'react';
import { render, screen } from '@testing-library/react';

/**
 * ConstituencyMap uses Leaflet which depends on a full DOM with canvas, SVG,
 * and browser globals that jsdom doesn't provide. We mock all Leaflet / react-leaflet
 * modules before importing the component so the test stays fast and deterministic.
 */

// 1. Mock leaflet itself to prevent "window is not defined" and icon errors
jest.mock('leaflet', () => ({
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: jest.fn(),
    },
  },
  map: jest.fn(),
}));

// 2. Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="leaflet-map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="leaflet-tile-layer" />,
  Polygon: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="leaflet-polygon">{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="leaflet-popup">{children}</div>
  ),
  Marker: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="leaflet-marker">{children}</div>
  ),
  useMap: jest.fn(() => ({
    setView: jest.fn(),
    on: jest.fn(),
  })),
}));

// 3. Mock leaflet CSS import (JSDOM cannot parse CSS files)
jest.mock('leaflet/dist/leaflet.css', () => {});

import ConstituencyMap from '../components/ConstituencyMap';

describe('ConstituencyMap (Leaflet mocked)', () => {
  it('mounts without throwing', () => {
    expect(() => render(<ConstituencyMap />)).not.toThrow();
  });

  it('renders the map container', () => {
    render(<ConstituencyMap />);
    expect(screen.getByTestId('leaflet-map-container')).toBeInTheDocument();
  });

  it('renders a tile layer', () => {
    render(<ConstituencyMap />);
    expect(screen.getByTestId('leaflet-tile-layer')).toBeInTheDocument();
  });

  it('renders the constituency polygon', () => {
    render(<ConstituencyMap />);
    expect(screen.getByTestId('leaflet-polygon')).toBeInTheDocument();
  });

  it('renders the popup with constituency name', () => {
    render(<ConstituencyMap />);
    expect(screen.getByText(/new delhi constituency/i)).toBeInTheDocument();
  });
});
