import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from '../../shared/Checkbox';
import { FormData } from '../../../types';

interface PreferencesProps {
  preferences: string[];
  onPreferenceChange: (preferences: string[]) => void;
}

const Preferences: React.FC<PreferencesProps> = ({
  preferences,
  onPreferenceChange,
}) => {
  const { control } = useFormContext<FormData>();

  const preferenceItems = useMemo(
    () =>
      preferences.map((preference, index) => (
        <div key={preference} className="flex items-start">
          <Controller
            name="preferences"
            control={control}
            rules={{ required: 'Selecione pelo menos uma preferência' }}
            render={({ field }) => (
              <Checkbox
                id={`preference-${index}`}
                value={preference}
                checked={field.value?.includes(preference) || false}
                onChange={() => {
                  const currentPreferences = field.value || [];
                  const updatedPreferences = currentPreferences.includes(
                    preference
                  )
                    ? currentPreferences.filter(
                        (pref: string) => pref !== preference
                      )
                    : [...currentPreferences, preference];

                  field.onChange(updatedPreferences);
                  onPreferenceChange(updatedPreferences);
                }}
              >
                {preference}
              </Checkbox>
            )}
          />
        </div>
      )),
    [preferences, control, onPreferenceChange]
  );

  return (
    <fieldset>
      <legend className="text-lg font-medium text-gray-900 mb-3">
        Preferências
      </legend>
      <div
        className="space-y-2"
        role="group"
        aria-labelledby="preferences-legend"
      >
        {preferenceItems}
      </div>
    </fieldset>
  );
};

export default Preferences;
