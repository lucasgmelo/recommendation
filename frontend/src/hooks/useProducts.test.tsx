import { renderHook, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from './useProducts';
import * as productService from '../services/product.service';
import mockProducts from '../mocks/mockProducts';
import { ErrorType } from '../types/errors';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

vi.mock('../services/product.service');

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns products successfully', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(result.current.isUsingMock).toBe(false);
  });

  test('extracts unique preferences from products', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.preferences.length).toBeGreaterThan(0);
    const uniquePrefs = new Set(result.current.preferences);
    expect(uniquePrefs.size).toBe(result.current.preferences.length);
  });

  test('extracts unique features from products', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.features.length).toBeGreaterThan(0);
    const uniqueFeatures = new Set(result.current.features);
    expect(uniqueFeatures.size).toBe(result.current.features.length);
  });

  test('handles error and uses mock data', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: {
        type: ErrorType.NETWORK_ERROR,
        message: 'Network error',
        timestamp: Date.now(),
      },
      isUsingMock: true,
    });

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeDefined();
    expect(result.current.error?.type).toBe(ErrorType.NETWORK_ERROR);
    expect(result.current.isUsingMock).toBe(true);
  });

  test('refetch function works correctly', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
    result.current.refetch();

    expect(productService.getProducts).toHaveBeenCalled();
  });
});
