import React from 'react';
import { render, screen } from '@testing-library/react';

/**
 * MapWrapper uses next/dynamic with ssr:false which doesn't work in jsdom.
 * We mock it to render a simple placeholder that proves the component tree
 * is assembled correctly without needing a real Leaflet/DOM canvas.
 */
jest.mock('next/dynamic', () => {
  // Return a factory that immediately resolves to a stub component
  return (_importFn: () => Promise<any>, options?: { loading?: () => React.ReactNode }) => {
    const Stub = () => <div data-testid="constituency-map-stub">Map Loaded</div>;
    Stub.displayName = 'DynamicConstituencyMapStub';
    return Stub;
  };
});

// Import AFTER mocking next/dynamic
import MapWrapper from '../components/MapWrapper';

describe('MapWrapper', () => {
  it('renders without crashing', () => {
    const { container } = render(<MapWrapper />);
    expect(container).toBeTruthy();
  });

  it('mounts the (mocked) Leaflet map component', () => {
    render(<MapWrapper />);
    expect(screen.getByTestId('constituency-map-stub')).toBeInTheDocument();
  });

  it('wraps the map in a sized container div', () => {
    const { container } = render(<MapWrapper />);
    // MapWrapper renders a div with responsive height classes
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName.toLowerCase()).toBe('div');
    expect(wrapper.className).toMatch(/h-/);
  });
});
