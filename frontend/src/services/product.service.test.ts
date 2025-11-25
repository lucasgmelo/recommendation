import axios from 'axios';
import { vi } from 'vitest';
import { getProducts } from './product.service';
import mockProducts from '../mocks/mockProducts';
import { ErrorType } from '../types/errors';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    isAxiosError: vi.fn(),
  },
}));

const mockedAxios = axios as any;

describe('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.warn = vi.fn();
  });

  it('returns products from API when request is successful', async () => {
    const mockApiProducts = [
      {
        id: 1,
        name: 'API Product 1',
        category: 'Test',
        preferences: [],
        features: [],
      },
      {
        id: 2,
        name: 'API Product 2',
        category: 'Test',
        preferences: [],
        features: [],
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: mockApiProducts,
    });

    const result = await getProducts();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      { timeout: 5000 }
    );
    expect(result.data).toEqual(mockApiProducts);
    expect(result.error).toBeNull();
    expect(result.isUsingMock).toBe(false);
  });

  it('returns mock products with network error when API request fails', async () => {
    const error = { code: 'ERR_NETWORK' };
    mockedAxios.get.mockRejectedValueOnce(error);

    const result = await getProducts();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      { timeout: 5000 }
    );
    expect(console.warn).toHaveBeenCalledWith(
      'API não disponível, usando dados mock:',
      error
    );
    expect(result.data).toEqual(mockProducts);
    expect(result.error).toBeDefined();
    expect(result.error?.type).toBe(ErrorType.NETWORK_ERROR);
    expect(result.isUsingMock).toBe(true);
  });

  it('returns mock products with API error when API returns error status', async () => {
    const error = {
      response: {
        status: 500,
        statusText: 'Internal Server Error',
      },
      isAxiosError: true,
    };
    mockedAxios.get.mockRejectedValueOnce(error);
    mockedAxios.isAxiosError.mockReturnValueOnce(true);

    const result = await getProducts();

    expect(result.data).toEqual(mockProducts);
    expect(result.error).toBeDefined();
    expect(result.error?.type).toBe(ErrorType.API_ERROR);
    expect(result.isUsingMock).toBe(true);
    expect(console.warn).toHaveBeenCalled();
  });

  it('handles unknown errors correctly', async () => {
    const error = new Error('Unknown error');
    mockedAxios.get.mockRejectedValueOnce(error);
    mockedAxios.isAxiosError.mockReturnValueOnce(false);

    const result = await getProducts();

    expect(result.data).toEqual(mockProducts);
    expect(result.error).toBeDefined();
    expect(result.error?.type).toBe(ErrorType.UNKNOWN_ERROR);
    expect(result.isUsingMock).toBe(true);
  });

  it('calls the correct API endpoint with timeout', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    await getProducts();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      { timeout: 5000 }
    );
  });
});
