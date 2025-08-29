import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Product } from '../types';
import { getProducts } from '../services/product.service';

interface UseProductsReturn {
  preferences: string[];
  features: string[];
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProducts = (): UseProductsReturn => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { preferences, features } = useMemo(() => {
    const preferencesSet = new Set<string>();
    const featuresSet = new Set<string>();

    if (Array.isArray(products)) {
      products.forEach((product) => {
        product.preferences.forEach((pref) => preferencesSet.add(pref));
        product.features.forEach((feat) => featuresSet.add(feat));
      });
    }

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
    error: error ? 'Falha ao carregar produtos. Usando dados locais.' : null,
  };
};

export default useProducts;
