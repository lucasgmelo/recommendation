import axios from 'axios';
import { Product } from '../types';
import mockProducts from '../mocks/mockProducts';

const baseURL = 'http://localhost:3001';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${baseURL}/products`);
    return response.data;
  } catch (error) {
    console.warn('API não disponível, usando dados mock:', error);
    return mockProducts;
  }
};

const productService = { getProducts };
export default productService;
