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
    container: 'border',
    icon: 'text-xl',
    title: 'font-semibold',
    message: 'text-sm',
  },
  warning: {
    container: 'border',
    icon: 'text-xl',
    title: 'font-semibold',
    message: 'text-sm',
  },
  info: {
    container: 'border',
    icon: 'text-xl',
    title: 'font-semibold',
    message: 'text-sm',
  },
  success: {
    container: 'border',
    icon: 'text-xl',
    title: 'font-semibold',
    message: 'text-sm',
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

  const getColors = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'var(--danger-surface-low-emphasis)',
          border: 'var(--danger-border)',
          icon: 'var(--danger-icon)',
          title: 'var(--danger-text)',
          message: 'var(--danger-text)',
        };
      case 'warning':
        return {
          bg: 'var(--warning-surface-low-emphasis)',
          border: 'var(--warning-border)',
          icon: 'var(--warning-icon)',
          title: 'var(--warning-text)',
          message: 'var(--warning-text)',
        };
      case 'info':
        return {
          bg: 'var(--primary-surface-low-emphasis)',
          border: 'var(--primary-border)',
          icon: 'var(--primary-icon)',
          title: 'var(--primary-text)',
          message: 'var(--primary-text)',
        };
      case 'success':
        return {
          bg: 'var(--success-surface-low-emphasis)',
          border: 'var(--success-border)',
          icon: 'var(--success-icon)',
          title: 'var(--success-text)',
          message: 'var(--success-text)',
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`rounded-lg p-4 ${styles.container}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
      role="alert"
      aria-live="polite"
      data-testid={testId}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <span className={styles.icon} style={{ color: colors.icon }} aria-hidden="true">
            {icon}
          </span>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`${styles.title} mb-1`} style={{ color: colors.title }}>
              {title}
            </h3>
          )}
          <p className={styles.message} style={{ color: colors.message }}>{message}</p>

          {(onRetry || onDismiss) && (
            <div className="mt-3 flex gap-2">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="text-sm font-medium hover:underline focus:outline-none focus:underline transition-colors"
                  style={{ color: 'var(--primary-text)' }}
                  data-testid="retry-button"
                >
                  Tentar novamente
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  onClick={onDismiss}
                  className="text-sm font-medium hover:underline focus:outline-none focus:underline transition-colors"
                  style={{ color: 'var(--neutral-text-low-emphasis)' }}
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
