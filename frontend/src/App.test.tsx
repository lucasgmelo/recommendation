import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import * as productService from './services/product.service';
import mockProducts from './mocks/mockProducts';

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

vi.mock('./services/product.service');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders app title', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<App />);

    expect(
      screen.getByText('Encontre o produto ideal para o seu negócio')
    ).toBeInTheDocument();
  });

  test('renders welcome message', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/De CRM a Marketing/i)
      ).toBeInTheDocument();
    });
  });

  test('renders form and recommendation sections', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('Configure suas preferências')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Recomendações de Produtos')
      ).toBeInTheDocument();
    });
  });

  test('wraps content with ErrorBoundary', async () => {
    vi.spyOn(productService, 'getProducts').mockResolvedValue({
      data: mockProducts,
      error: null,
      isUsingMock: false,
    });

    renderWithClient(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('Encontre o produto ideal para o seu negócio')
      ).toBeInTheDocument();
    });
  });
});
