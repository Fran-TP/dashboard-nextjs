import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { poppinsFont } from '@/app/ui/fonts'

export default function AcmeLogo() {
  return (
    <div
      className={`${poppinsFont.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="size-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  )
}
