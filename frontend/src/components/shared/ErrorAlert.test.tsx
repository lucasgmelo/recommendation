import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert', () => {
  test('renders error message correctly', () => {
    render(<ErrorAlert message="Erro ao carregar dados" />);

    expect(screen.getByText('Erro ao carregar dados')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('renders with title when provided', () => {
    render(
      <ErrorAlert title="Erro Crítico" message="Algo deu errado" type="error" />
    );

    expect(screen.getByText('Erro Crítico')).toBeInTheDocument();
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });

  test('renders retry button when onRetry is provided', () => {
    const handleRetry = vi.fn();
    render(<ErrorAlert message="Erro" onRetry={handleRetry} />);

    const retryButton = screen.getByTestId('retry-button');
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test('renders dismiss button when onDismiss is provided', () => {
    const handleDismiss = vi.fn();
    render(<ErrorAlert message="Aviso" onDismiss={handleDismiss} />);

    const dismissButton = screen.getByTestId('dismiss-button');
    expect(dismissButton).toBeInTheDocument();

    fireEvent.click(dismissButton);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  test('renders different alert types with correct styles', () => {
    const { rerender } = render(<ErrorAlert type="error" message="Erro" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50');

    rerender(<ErrorAlert type="warning" message="Aviso" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');

    rerender(<ErrorAlert type="info" message="Informação" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');

    rerender(<ErrorAlert type="success" message="Sucesso" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50');
  });

  test('renders both retry and dismiss buttons when provided', () => {
    const handleRetry = vi.fn();
    const handleDismiss = vi.fn();

    render(
      <ErrorAlert
        message="Erro recuperável"
        onRetry={handleRetry}
        onDismiss={handleDismiss}
      />
    );

    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
    expect(screen.getByTestId('dismiss-button')).toBeInTheDocument();
  });

  test('does not render buttons when callbacks are not provided', () => {
    render(<ErrorAlert message="Apenas mensagem" />);

    expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dismiss-button')).not.toBeInTheDocument();
  });

  test('uses custom testId when provided', () => {
    render(<ErrorAlert message="Test" testId="custom-alert" />);

    expect(screen.getByTestId('custom-alert')).toBeInTheDocument();
  });
});
