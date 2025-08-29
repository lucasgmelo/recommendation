import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import Preferences from './Preferences';
import { FormData } from '../../../types';

const mockPreferences = ['Preference 1', 'Preference 2', 'Preference 3'];

const TestWrapper = ({ children, defaultValues = {} }: any) => {
  const methods = useForm<FormData>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Preferences Component', () => {
  const mockOnPreferenceChange = vi.fn();

  beforeEach(() => {
    mockOnPreferenceChange.mockClear();
  });

  it('renders all preferences as checkboxes', () => {
    render(
      <TestWrapper>
        <Preferences
          preferences={mockPreferences}
          onPreferenceChange={mockOnPreferenceChange}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Preferências')).toBeInTheDocument();
    expect(screen.getByText('Preference 1')).toBeInTheDocument();
    expect(screen.getByText('Preference 2')).toBeInTheDocument();
    expect(screen.getByText('Preference 3')).toBeInTheDocument();
  });

  it('calls onPreferenceChange when a preference is selected', () => {
    render(
      <TestWrapper>
        <Preferences
          preferences={mockPreferences}
          onPreferenceChange={mockOnPreferenceChange}
        />
      </TestWrapper>
    );

    const checkbox = screen.getByLabelText('Preference 1');
    fireEvent.click(checkbox);

    expect(mockOnPreferenceChange).toHaveBeenCalledWith(['Preference 1']);
  });

  it('calls onPreferenceChange when a preference is deselected', () => {
    render(
      <TestWrapper
        defaultValues={{ preferences: ['Preference 1', 'Preference 2'] }}
      >
        <Preferences
          preferences={mockPreferences}
          onPreferenceChange={mockOnPreferenceChange}
        />
      </TestWrapper>
    );

    const checkbox = screen.getByLabelText('Preference 1');
    fireEvent.click(checkbox);

    expect(mockOnPreferenceChange).toHaveBeenCalledWith(['Preference 2']);
  });

  it('shows correct checked state for pre-selected preferences', () => {
    render(
      <TestWrapper
        defaultValues={{ preferences: ['Preference 1', 'Preference 3'] }}
      >
        <Preferences
          preferences={mockPreferences}
          onPreferenceChange={mockOnPreferenceChange}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Preference 1')).toBeChecked();
    expect(screen.getByLabelText('Preference 2')).not.toBeChecked();
    expect(screen.getByLabelText('Preference 3')).toBeChecked();
  });

  it('handles multiple preference selections correctly', () => {
    render(
      <TestWrapper>
        <Preferences
          preferences={mockPreferences}
          onPreferenceChange={mockOnPreferenceChange}
        />
      </TestWrapper>
    );

    fireEvent.click(screen.getByLabelText('Preference 1'));
    fireEvent.click(screen.getByLabelText('Preference 2'));

    expect(mockOnPreferenceChange).toHaveBeenCalledTimes(2);
    expect(mockOnPreferenceChange).toHaveBeenNthCalledWith(1, ['Preference 1']);
    expect(mockOnPreferenceChange).toHaveBeenNthCalledWith(2, [
      'Preference 1',
      'Preference 2',
    ]);
  });
});
