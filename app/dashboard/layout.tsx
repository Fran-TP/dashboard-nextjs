import SideNav from '@/app/ui/dashboard/sidenav'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-dvh flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="p-6 md:overflow-y-auto md:p-12">
          {/* <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            > */}
          {children}
          {/* </motion.div>
          </AnimatePresence> */}
        </div>
      </div>
    </div>
  )
}

export default Layout
