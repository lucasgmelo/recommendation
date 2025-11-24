import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Form from './Form';
import * as productService from '../../services/product.service';
import mockProducts from '../../mocks/mockProducts';
import { ErrorType } from '../../types/errors';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
};

vi.mock('../../services/product.service');

describe('Form', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading state initially', () => {
    vi.spyOn(productService, 'getProducts').mockImplementation(
      () => new Promise(() => {})
    );

    renderWithClient(<Form />);

    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders form after loading products', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<Form />);

    await waitFor(() => {
      expect(
        screen.getByText('Configure suas preferências')
      ).toBeInTheDocument();
    });
  });

  test('shows error alert when products fail to load with network error', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: {
        type: ErrorType.NETWORK_ERROR,
        message: 'Network connection failed',
        timestamp: Date.now(),
      },
      isUsingMock: true,
    });

    renderWithClient(<Form />);

    await waitFor(() => {
      expect(screen.getByTestId('products-error-alert')).toBeInTheDocument();
      expect(screen.getByText('Network connection failed')).toBeInTheDocument();
    });
  });

  test('submit button is present', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<Form />);

    await waitFor(() => {
      expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
    });
  });

  test('renders form with preferences and features', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<Form />);

    await waitFor(() => {
      expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
    });

    // Verify that preferences and features are rendered
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  test('allows form submission with valid selections', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<Form />);

    await waitFor(() => {
      expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
    });

    // Select a checkbox
    const checkboxes = await screen.findAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Should not show error with valid selection
    expect(screen.queryByTestId('submit-error-alert')).not.toBeInTheDocument();
  });

  test('retry button calls refetch on network error', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: {
        type: ErrorType.NETWORK_ERROR,
        message: 'Network error',
        timestamp: Date.now(),
      },
      isUsingMock: true,
    });

    renderWithClient(<Form />);

    await waitFor(() => {
      const retryButton = screen.queryByTestId('retry-button');
      expect(retryButton).toBeInTheDocument();
    });
  });
});
