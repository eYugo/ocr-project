import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Lusitana } from 'next/font/google'

const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function AppLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <DocumentMagnifyingGlassIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">OCR</p>
    </div>
  );
}
