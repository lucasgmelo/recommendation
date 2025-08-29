import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { useProducts } from '../../hooks/useProducts';
import { getRecommendations } from '../../services/recommendation.service';
import { Product, FormData } from '../../types';

interface FormProps {
  onRecommendationsChange?: (recommendations: Product | Product[]) => void;
}

const Form: React.FC<FormProps> = ({ onRecommendationsChange }) => {
  const { preferences, features, products, loading, error } = useProducts();
  const methods = useForm<FormData>({
    defaultValues: {
      preferences: [],
      features: [],
      recommendationType: 'single',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
  } = methods;

  const formData = watch();

  const onSubmit = useCallback(
    (data: FormData) => {
      if (products.length === 0) return;

      const recommendations = getRecommendations(
        {
          preferences: data.preferences,
          features: data.features,
          type: data.recommendationType,
        },
        products
      );

      onRecommendationsChange?.(recommendations);
    },
    [products, onRecommendationsChange]
  );

  const handlePreferenceChange = useCallback(
    (selected: string[]) => {
      setValue('preferences', selected, { shouldValidate: true });
    },
    [setValue]
  );

  const handleFeatureChange = useCallback(
    (selected: string[]) => {
      setValue('features', selected, { shouldValidate: true });
    },
    [setValue]
  );

  const handleRecommendationTypeChange = useCallback(
    (selected: 'single' | 'multiple') => {
      setValue('recommendationType', selected, { shouldValidate: true });
    },
    [setValue]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando produtos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-800">{error}</p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className="space-y-6">
          <legend className="text-xl font-semibold text-gray-900 mb-4">
            Configure suas preferências
          </legend>

          <Preferences
            preferences={preferences}
            selectedPreferences={formData.preferences}
            onPreferenceChange={handlePreferenceChange}
          />

          <Features
            features={features}
            selectedFeatures={formData.features}
            onFeatureChange={handleFeatureChange}
          />

          <RecommendationType
            selectedType={formData.recommendationType}
            onRecommendationTypeChange={handleRecommendationTypeChange}
          />

          <SubmitButton text="Obter recomendação" disabled={!isValid} />
        </fieldset>
      </form>
    </FormProvider>
  );
};

export default Form;
