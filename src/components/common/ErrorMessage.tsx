import { memo } from 'react'

interface ErrorMessageProps {
  message?: string
}

function ErrorMessage({ message = 'Идут технические работы' }: ErrorMessageProps) {
  return (
    <div className="error-message">
      {message}
    </div>
  )
}

export default memo(ErrorMessage)

