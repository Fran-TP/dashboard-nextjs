'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebounce } from '../hooks/useDebounce'

interface SearchProps {
  placeholder: string
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultSearchString = searchParams.get('query')?.toString()

  const handleSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', '1')

    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 transition-colors"
        placeholder={placeholder}
        autoComplete="off"
        onChange={e => {
          handleSearch(e.target.value)
        }}
        defaultValue={defaultSearchString}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}

export default Search
