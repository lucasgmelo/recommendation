import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import RecommendationList from './RecommendationList';
import { Product } from '../../types';

describe('RecommendationList', () => {
  test('renders empty state when no recommendations', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(screen.getByTestId('empty-recommendations')).toBeInTheDocument();
    expect(
      screen.getByText('Nenhuma recomendação encontrada.')
    ).toBeInTheDocument();
  });

  test('renders recommendations when provided', () => {
    const mockRecommendations: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
        preferences: ['Pref 1', 'Pref 2'],
        features: ['Feature 1'],
      },
      {
        id: 2,
        name: 'Product 2',
        category: 'Category 2',
        preferences: ['Pref 3'],
        features: ['Feature 2', 'Feature 3'],
      },
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  test('renders preferences and features correctly', () => {
    const mockRecommendations: Product[] = [
      {
        id: 1,
        name: 'Test Product',
        category: 'Test',
        preferences: ['Pref 1'],
        features: ['Feature 1'],
      },
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('Preferências atendidas:')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades:')).toBeInTheDocument();
    expect(screen.getByText('Pref 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });

  test('renders multiple recommendation items', () => {
    const mockRecommendations: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        category: 'Cat 1',
        preferences: [],
        features: [],
      },
      {
        id: 2,
        name: 'Product 2',
        category: 'Cat 2',
        preferences: [],
        features: [],
      },
      {
        id: 3,
        name: 'Product 3',
        category: 'Cat 3',
        preferences: [],
        features: [],
      },
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    const items = screen.getAllByTestId('recommendation-item');
    expect(items).toHaveLength(3);
  });

  test('does not render preferences section when empty', () => {
    const mockRecommendations: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        category: 'Test',
        preferences: [],
        features: ['Feature 1'],
      },
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(
      screen.queryByText('Preferências atendidas:')
    ).not.toBeInTheDocument();
  });

  test('does not render features section when empty', () => {
    const mockRecommendations: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        category: 'Test',
        preferences: ['Pref 1'],
        features: [],
      },
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.queryByText('Funcionalidades:')).not.toBeInTheDocument();
  });
});
