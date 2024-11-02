'use client'

import SideNav from '@/app/ui/dashboard/sidenav'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export const experimental_ppr = true

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname()

  return (
    <div className="flex h-dvh flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="p-6 md:overflow-y-auto md:p-12">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={pathname}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Layout
