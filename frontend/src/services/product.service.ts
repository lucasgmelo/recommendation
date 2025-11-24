import axios, { AxiosError } from 'axios';
import { Product } from '../types';
import mockProducts from '../mocks/mockProducts';
import {
  AppError,
  createError,
  ErrorType,
  isNetworkError,
  getErrorMessage,
} from '../types/errors';

const baseURL = 'http://localhost:3001';
const TIMEOUT = 5000;

interface ProductServiceResult {
  data: Product[];
  error: AppError | null;
  isUsingMock: boolean;
}

export const getProducts = async (): Promise<ProductServiceResult> => {
  try {
    const response = await axios.get<Product[]>(`${baseURL}/products`, {
      timeout: TIMEOUT,
    });

    return {
      data: response.data,
      error: null,
      isUsingMock: false,
    };
  } catch (error) {
    console.warn('API não disponível, usando dados mock:', error);

    let appError: AppError;

    if (isNetworkError(error)) {
      appError = createError(
        ErrorType.NETWORK_ERROR,
        'Não foi possível conectar à API. Usando dados de exemplo.',
        error
      );
    } else if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      appError = createError(
        ErrorType.API_ERROR,
        `Erro na API: ${axiosError.response?.status || 'Desconhecido'}. Usando dados de exemplo.`,
        {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
        }
      );
    } else {
      appError = createError(
        ErrorType.UNKNOWN_ERROR,
        getErrorMessage(error),
        error
      );
    }

    return {
      data: mockProducts,
      error: appError,
      isUsingMock: true,
    };
  }
};

const productService = { getProducts };
export default productService;
