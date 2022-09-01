import Link from 'next/link';

export default function Navitem({ href, children }) {
  return (
    <Link href={href}>
      <a className="p-2 font-semibold border-b-2 border-transparent hover:border-b-white hover:text-white">
        {children}
      </a>
    </Link>
  );
}
