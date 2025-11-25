import React, { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { useProducts } from '../../hooks/useProducts';
import { getRecommendations } from '../../services/recommendation.service';
import { Product, FormData } from '../../types';
import { ErrorType } from '../../types/errors';
import ErrorAlert from '../shared/ErrorAlert';

interface FormProps {
  onRecommendationsChange?: (recommendations: Product | Product[]) => void;
}

const Form: React.FC<FormProps> = ({ onRecommendationsChange }) => {
  const { preferences, features, products, loading, error, refetch } =
    useProducts();
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    formState: { isValid, isSubmitting },
    watch,
    setValue,
  } = methods;

  const formData = watch();

  const onSubmit = useCallback(
    (data: FormData) => {
      try {
        setSubmitError(null);

        if (products.length === 0) {
          setSubmitError(
            'Nenhum produto disponível para recomendação. Por favor, tente novamente.'
          );
          return;
        }

        if (data.preferences.length === 0 && data.features.length === 0) {
          setSubmitError(
            'Por favor, selecione pelo menos uma preferência ou funcionalidade.'
          );
          return;
        }

        const recommendations = getRecommendations(
          {
            preferences: data.preferences,
            features: data.features,
            type: data.recommendationType,
          },
          products
        );

        onRecommendationsChange?.(recommendations);
      } catch (err) {
        console.error('Error generating recommendations:', err);
        setSubmitError(
          'Erro ao gerar recomendações. Por favor, tente novamente.'
        );
      }
    },
    [products, onRecommendationsChange]
  );

  const handlePreferenceChange = useCallback(
    (selected: string[]) => {
      setValue('preferences', selected, { shouldValidate: true });
      setSubmitError(null);
    },
    [setValue]
  );

  const handleFeatureChange = useCallback(
    (selected: string[]) => {
      setValue('features', selected, { shouldValidate: true });
      setSubmitError(null);
    },
    [setValue]
  );

  const handleRecommendationTypeChange = useCallback(
    (selected: 'single' | 'multiple') => {
      setValue('recommendationType', selected, { shouldValidate: true });
    },
    [setValue]
  );

  const alertType = !error
    ? 'warning'
    : error.type === ErrorType.NETWORK_ERROR
      ? 'warning'
      : 'info';

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8" role="status">
        <div 
          className="animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: 'var(--primary-border)' }}
        ></div>
        <span className="ml-2" style={{ color: 'var(--neutral-text-low-emphasis)' }}>Carregando produtos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <ErrorAlert
          type={alertType}
          message={error.message}
          onRetry={error.type === ErrorType.NETWORK_ERROR ? refetch : undefined}
          testId="products-error-alert"
        />
      )}

      {submitError && (
        <ErrorAlert
          type="error"
          message={submitError}
          onDismiss={() => setSubmitError(null)}
          testId="submit-error-alert"
        />
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset className="space-y-6">
            <legend className="text-xl font-semibold mb-4" style={{ color: 'var(--neutral-text-high-emphasis)' }}>
              Configure suas preferências
            </legend>

            <Preferences
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
            />

            <Features
              features={features}
              onFeatureChange={handleFeatureChange}
            />

            <RecommendationType
              selectedType={formData.recommendationType}
              onRecommendationTypeChange={handleRecommendationTypeChange}
            />

            <SubmitButton
              text="Obter recomendação"
              disabled={!isValid || isSubmitting}
            />
          </fieldset>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
