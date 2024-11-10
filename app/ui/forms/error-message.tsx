import clsx from 'clsx'

interface ErrorMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  message?: string[]
}

const ErrorMessage = ({ message, ...rest }: ErrorMessageProps) => {
  return (
    <span
      className={clsx('inline-block p-0 m-0 text-xs text-red-600', {
        invisible: !message
      })}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      {...rest}
    >
      {message}
    </span>
  )
}

export default ErrorMessage
