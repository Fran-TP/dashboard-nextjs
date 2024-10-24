'use client'

import SideNav from '@/app/ui/dashboard/sidenav'
import { usePathname } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/')

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-100">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="hidden md:block text-xl p-4">
          {pathSegments.map((segment, index) => {
            const lastIndex = pathSegments.length - 1

            return (
              <span className="last:text-blue-500 text-gray-500" key={segment}>
                {segment}
                {index < lastIndex && <strong>{' / '}</strong>}
              </span>
            )
          })}
        </div>
        <div className="p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </div>
  )
}

export default Layout
