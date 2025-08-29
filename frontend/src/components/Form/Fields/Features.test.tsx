import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import Features from './Features';
import { FormData } from '../../../types';

const mockFeatures = ['Feature 1', 'Feature 2', 'Feature 3'];

const TestWrapper = ({ children, defaultValues = {} }: any) => {
  const methods = useForm<FormData>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Features Component', () => {
  const mockOnFeatureChange = vi.fn();

  beforeEach(() => {
    mockOnFeatureChange.mockClear();
  });

  it('renders all features as checkboxes', () => {
    render(
      <TestWrapper>
        <Features
          features={mockFeatures}
          onFeatureChange={mockOnFeatureChange}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('calls onFeatureChange when a feature is selected', () => {
    render(
      <TestWrapper>
        <Features
          features={mockFeatures}
          onFeatureChange={mockOnFeatureChange}
        />
      </TestWrapper>
    );

    const checkbox = screen.getByLabelText('Feature 1');
    fireEvent.click(checkbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith(['Feature 1']);
  });

  it('calls onFeatureChange when a feature is deselected', () => {
    render(
      <TestWrapper defaultValues={{ features: ['Feature 1', 'Feature 2'] }}>
        <Features
          features={mockFeatures}
          onFeatureChange={mockOnFeatureChange}
        />
      </TestWrapper>
    );

    const checkbox = screen.getByLabelText('Feature 1');
    fireEvent.click(checkbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith(['Feature 2']);
  });

  it('shows correct checked state for pre-selected features', () => {
    render(
      <TestWrapper defaultValues={{ features: ['Feature 1', 'Feature 3'] }}>
        <Features
          features={mockFeatures}
          onFeatureChange={mockOnFeatureChange}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Feature 1')).toBeChecked();
    expect(screen.getByLabelText('Feature 2')).not.toBeChecked();
    expect(screen.getByLabelText('Feature 3')).toBeChecked();
  });

  it('handles multiple feature selections correctly', () => {
    render(
      <TestWrapper>
        <Features
          features={mockFeatures}
          onFeatureChange={mockOnFeatureChange}
        />
      </TestWrapper>
    );

    fireEvent.click(screen.getByLabelText('Feature 1'));
    fireEvent.click(screen.getByLabelText('Feature 2'));

    expect(mockOnFeatureChange).toHaveBeenCalledTimes(2);
    expect(mockOnFeatureChange).toHaveBeenNthCalledWith(1, ['Feature 1']);
    expect(mockOnFeatureChange).toHaveBeenNthCalledWith(2, [
      'Feature 1',
      'Feature 2',
    ]);
  });
});
