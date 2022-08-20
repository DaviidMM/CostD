import Link from 'next/link';

export default function Navitem({ href, children }) {
  return (
    <Link href={href}>
      <a className="p-2 transition-all rounded-md hover:bg-slate-600">
        {children}
      </a>
    </Link>
  );
}
