import Link from 'next/link'

interface Breadcrumb {
  label: string
  href: string
  active?: boolean
}

export default function Breadcrumbs({
  breadcrumbs
}: {
  breadcrumbs: Breadcrumb[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={breadcrumb.active ? 'text-blue-500' : 'text-gray-500'}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-3 inline-block">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
