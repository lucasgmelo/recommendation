export interface Product {
  id: number;
  name: string;
  category: string;
  preferences: string[];
  features: string[];
  description?: string;
}

export interface FormData {
  preferences: string[];
  features: string[];
  recommendationType: 'single' | 'multiple';
}

export interface RecommendationInput {
  preferences: string[];
  features: string[];
  type: 'single' | 'multiple';
}

export interface RecommendationResult {
  product: Product;
  score: number;
  matchingPreferences: string[];
  matchingFeatures: string[];
  originalIndex?: number;
}

export interface FormErrors {
  preferences?: string;
  features?: string;
  recommendationType?: string;
}

export interface UseFormReturn {
  formData: FormData;
  errors: FormErrors;
  handleChange: (name: keyof FormData, value: string | string[]) => void;
  handlePreferenceChange: (selected: string[]) => void;
  handleFeatureChange: (selected: string[]) => void;
  handleRecommendationTypeChange: (selected: 'single' | 'multiple') => void;
  resetForm: () => void;
  isValid: boolean;
}
