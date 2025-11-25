export type AlertType = 'error' | 'warning' | 'info' | 'success';

export interface ErrorAlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  testId?: string;
}

const alertStyles: Record<
  AlertType,
  { container: string; icon: string; title: string; message: string; button: string }
> = {
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-400',
    title: 'text-red-800',
    message: 'text-red-700',
    button: 'text-red-800 hover:text-red-900',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-400',
    title: 'text-yellow-800',
    message: 'text-yellow-700',
    button: 'text-yellow-800 hover:text-yellow-900',
  },
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-400',
    title: 'text-blue-800',
    message: 'text-blue-700',
    button: 'text-blue-800 hover:text-blue-900',
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-400',
    title: 'text-green-800',
    message: 'text-green-700',
    button: 'text-green-800 hover:text-green-900',
  },
};

const icons: Record<AlertType, string> = {
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
  success: '✓',
};

const ErrorAlert = ({
  type = 'error',
  title,
  message,
  onRetry,
  onDismiss,
  testId = 'error-alert',
}: ErrorAlertProps) => {
  const styles = alertStyles[type];
  const icon = icons[type];

  return (
    <div
      className={`rounded-lg p-4 border ${styles.container}`}
      role="alert"
      aria-live="polite"
      data-testid={testId}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <span className={`text-xl ${styles.icon}`} aria-hidden="true">
            {icon}
          </span>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium mb-1 ${styles.title}`}>
              {title}
            </h3>
          )}
          <p className={`text-sm ${styles.message}`}>{message}</p>

          {(onRetry || onDismiss) && (
            <div className="mt-3 flex gap-2">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className={`text-sm font-medium hover:underline focus:outline-none focus:underline transition-colors ${styles.button}`}
                  data-testid="retry-button"
                >
                  Tentar novamente
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  onClick={onDismiss}
                  className={`text-sm font-medium hover:underline focus:outline-none focus:underline transition-colors ${styles.button}`}
                  data-testid="dismiss-button"
                >
                  Dispensar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ErrorAlert.displayName = 'ErrorAlert';

export default ErrorAlert;
