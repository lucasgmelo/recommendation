import { useState, useCallback, useMemo } from 'react';
import { FormData, FormErrors, UseFormReturn } from '../types';

const initialFormData: FormData = {
  preferences: [],
  features: [],
  recommendationType: 'single',
};

export const useForm = (
  initialState: FormData = initialFormData
): UseFormReturn => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (name: keyof FormData, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      setErrors((prev) => {
        if (prev[name]) {
          return { ...prev, [name]: undefined };
        }
        return prev;
      });
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const handlePreferenceChange = useCallback(
    (selected: string[]) => {
      handleChange('preferences', selected);
    },
    [handleChange]
  );

  const handleFeatureChange = useCallback(
    (selected: string[]) => {
      handleChange('features', selected);
    },
    [handleChange]
  );

  const handleRecommendationTypeChange = useCallback(
    (selected: 'single' | 'multiple') => {
      handleChange('recommendationType', selected);
    },
    [handleChange]
  );

  const isValid = useMemo(
    () => formData.preferences.length > 0 && formData.features.length > 0,
    [formData.preferences.length, formData.features.length]
  );

  return {
    formData,
    errors,
    handleChange,
    handlePreferenceChange,
    handleFeatureChange,
    handleRecommendationTypeChange,
    resetForm,
    isValid,
  };
};

export default useForm;
