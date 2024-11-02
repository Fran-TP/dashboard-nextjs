import { useRef } from 'react'

export function useDebounce<T>(
  callback: (...parameters: T[]) => void,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debounceFunction = (...args: T[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debounceFunction
}
