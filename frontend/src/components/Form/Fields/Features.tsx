import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from '../../shared/Checkbox';
import { FormData } from '../../../types';

interface FeaturesProps {
  features: string[];
  onFeatureChange: (features: string[]) => void;
}

const Features: React.FC<FeaturesProps> = ({ features, onFeatureChange }) => {
  const { control } = useFormContext<FormData>();

  const featureItems = useMemo(
    () =>
      features.map((feature, index) => (
        <div key={feature} className="flex items-start">
          <Controller
            name="features"
            control={control}
            rules={{ required: 'Selecione pelo menos uma funcionalidade' }}
            render={({ field }) => (
              <Checkbox
                id={`feature-${index}`}
                value={feature}
                checked={field.value?.includes(feature) || false}
                onChange={() => {
                  const currentFeatures = field.value || [];
                  const updatedFeatures = currentFeatures.includes(feature)
                    ? currentFeatures.filter((feat: string) => feat !== feature)
                    : [...currentFeatures, feature];

                  field.onChange(updatedFeatures);
                  onFeatureChange(updatedFeatures);
                }}
              >
                {feature}
              </Checkbox>
            )}
          />
        </div>
      )),
    [features, control, onFeatureChange]
  );

  return (
    <fieldset>
      <legend className="text-lg font-medium text-gray-900 mb-3">
        Funcionalidades
      </legend>
      <div className="space-y-2" role="group" aria-labelledby="features-legend">
        {featureItems}
      </div>
    </fieldset>
  );
};

export default Features;
