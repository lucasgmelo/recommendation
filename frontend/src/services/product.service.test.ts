import axios from 'axios';
import { vi } from 'vitest';
import { getProducts } from './product.service';
import mockProducts from '../mocks/mockProducts';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedAxios = axios as any;

describe('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.warn = vi.fn(); // Mock console.warn to avoid noise in tests
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
      'http://localhost:3001/products'
    );
    expect(result).toEqual(mockApiProducts);
  });

  it('returns mock products when API request fails', async () => {
    const error = new Error('Network Error');
    mockedAxios.get.mockRejectedValueOnce(error);

    const result = await getProducts();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:3001/products'
    );
    expect(console.warn).toHaveBeenCalledWith(
      'API não disponível, usando dados mock:',
      error
    );
    expect(result).toEqual(mockProducts);
  });

  it('returns mock products when API returns error status', async () => {
    const error = {
      response: {
        status: 500,
        statusText: 'Internal Server Error',
      },
    };
    mockedAxios.get.mockRejectedValueOnce(error);

    const result = await getProducts();

    expect(result).toEqual(mockProducts);
    expect(console.warn).toHaveBeenCalledWith(
      'API não disponível, usando dados mock:',
      error
    );
  });

  it('calls the correct API endpoint', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    await getProducts();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://localhost:3001/products'
    );
  });
});
