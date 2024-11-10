'use client'

import clsx from 'clsx'

export const Spin = ({
  className,
  ...rest
}: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      className={clsx('size-5 text-white animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <title>spin icon</title>
      <path className="opacity-25" d="M12 3a9 9 0 1 0 9 9" />
      <path d="M21 12a9 9 0 0 0 -9 -9" className="opacity-75" />
    </svg>
  )
}
