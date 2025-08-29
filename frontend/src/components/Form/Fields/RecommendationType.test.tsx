import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import RecommendationType from './RecommendationType';

describe('RecommendationType Component', () => {
  const mockOnRecommendationTypeChange = vi.fn();

  beforeEach(() => {
    mockOnRecommendationTypeChange.mockClear();
  });

  it('renders both radio button options', () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    expect(screen.getByText('Tipo de Recomendação')).toBeInTheDocument();
    expect(screen.getByText('Produto Único')).toBeInTheDocument();
    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
  });

  it('calls onRecommendationTypeChange when single is selected', () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    const singleRadio = screen.getByLabelText('Produto Único');
    fireEvent.click(singleRadio);

    expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith('single');
  });

  it('calls onRecommendationTypeChange when multiple is selected', () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    const multipleRadio = screen.getByLabelText('Múltiplos Produtos');
    fireEvent.click(multipleRadio);

    expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith('multiple');
  });

  it('shows correct selected state when selectedType is single', () => {
    render(
      <RecommendationType
        selectedType="single"
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    expect(screen.getByLabelText('Produto Único')).toBeChecked();
    expect(screen.getByLabelText('Múltiplos Produtos')).not.toBeChecked();
  });

  it('shows correct selected state when selectedType is multiple', () => {
    render(
      <RecommendationType
        selectedType="multiple"
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    expect(screen.getByLabelText('Produto Único')).not.toBeChecked();
    expect(screen.getByLabelText('Múltiplos Produtos')).toBeChecked();
  });

  it('allows switching between options', () => {
    render(
      <RecommendationType
        selectedType="single"
        onRecommendationTypeChange={mockOnRecommendationTypeChange}
      />
    );

    const multipleRadio = screen.getByLabelText('Múltiplos Produtos');
    fireEvent.click(multipleRadio);

    expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith('multiple');
  });
});
