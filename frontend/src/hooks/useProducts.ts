import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Product } from '../types';
import { AppError } from '../types/errors';
import { getProducts } from '../services/product.service';

interface UseProductsReturn {
  preferences: string[];
  features: string[];
  products: Product[];
  loading: boolean;
  error: AppError | null;
  isUsingMock: boolean;
  refetch: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    retry: 1,
  });

  const products =
    data && 'data' in data && Array.isArray(data.data) ? data.data : [];
  const error = data && 'error' in data ? data.error : null;
  const isUsingMock = data && 'isUsingMock' in data ? data.isUsingMock : false;

  const { preferences, features } = useMemo(() => {
    const preferencesSet = new Set<string>();
    const featuresSet = new Set<string>();

    products.forEach((product) => {
      product.preferences.forEach((pref) => preferencesSet.add(pref));
      product.features.forEach((feat) => featuresSet.add(feat));
    });

    return {
      preferences: Array.from(preferencesSet),
      features: Array.from(featuresSet),
    };
  }, [products]);

  return {
    preferences,
    features,
    products,
    loading: isLoading,
    error,
    isUsingMock,
    refetch: () => {
      refetch();
    },
  };
};

export default useProducts;
