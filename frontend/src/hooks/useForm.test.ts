import { act, renderHook } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm Hook', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useForm());

    expect(result.current.formData).toEqual({
      preferences: [],
      features: [],
      recommendationType: 'single',
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(false);
  });

  it('initializes with custom initial state', () => {
    const initialState = {
      preferences: ['test preference'],
      features: ['test feature'],
      recommendationType: 'multiple' as const,
    };

    const { result } = renderHook(() => useForm(initialState));

    expect(result.current.formData).toEqual(initialState);
    expect(result.current.isValid).toBe(true);
  });

  it('handles preference changes', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handlePreferenceChange(['preference 1', 'preference 2']);
    });

    expect(result.current.formData.preferences).toEqual([
      'preference 1',
      'preference 2',
    ]);
  });

  it('handles feature changes', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleFeatureChange(['feature 1', 'feature 2']);
    });

    expect(result.current.formData.features).toEqual([
      'feature 1',
      'feature 2',
    ]);
  });

  it('handles recommendation type changes', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleRecommendationTypeChange('multiple');
    });

    expect(result.current.formData.recommendationType).toBe('multiple');
  });

  it('validates form correctly - invalid when empty', () => {
    const { result } = renderHook(() => useForm());

    expect(result.current.isValid).toBe(false);
  });

  it('validates form correctly - invalid when only preferences selected', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handlePreferenceChange(['preference 1']);
    });

    expect(result.current.isValid).toBe(false);
  });

  it('validates form correctly - invalid when only features selected', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleFeatureChange(['feature 1']);
    });

    expect(result.current.isValid).toBe(false);
  });

  it('validates form correctly - valid when both preferences and features selected', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handlePreferenceChange(['preference 1']);
      result.current.handleFeatureChange(['feature 1']);
    });

    expect(result.current.isValid).toBe(true);
  });

  it('clears errors when field is updated', () => {
    const { result } = renderHook(() => useForm());

    // Manually set an error
    act(() => {
      result.current.handleChange('preferences', []);
    });

    // Add an error manually for testing
    result.current.errors.preferences = 'Required field';

    act(() => {
      result.current.handlePreferenceChange(['new preference']);
    });

    expect(result.current.errors.preferences).toBeUndefined();
  });

  it('resets form to initial state', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handlePreferenceChange(['preference 1']);
      result.current.handleFeatureChange(['feature 1']);
      result.current.handleRecommendationTypeChange('multiple');
    });

    expect(result.current.formData).not.toEqual({
      preferences: [],
      features: [],
      recommendationType: 'single',
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({
      preferences: [],
      features: [],
      recommendationType: 'single',
    });
    expect(result.current.errors).toEqual({});
  });

  it('handles direct field changes', () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleChange('recommendationType', 'multiple');
    });

    expect(result.current.formData.recommendationType).toBe('multiple');
  });
});
