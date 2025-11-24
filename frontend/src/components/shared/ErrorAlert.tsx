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
  { container: string; icon: string; title: string; message: string }
> = {
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    title: 'text-red-900',
    message: 'text-red-700',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    title: 'text-yellow-900',
    message: 'text-yellow-700',
  },
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    message: 'text-blue-700',
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    title: 'text-green-900',
    message: 'text-green-700',
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
      className={`border rounded-md p-4 ${styles.container}`}
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
            <h3 className={`text-sm font-medium ${styles.title} mb-1`}>
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
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors"
                  data-testid="retry-button"
                >
                  Tentar novamente
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  onClick={onDismiss}
                  className="text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition-colors"
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
