import Header from '../Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="flex flex-grow bg-gradient-to-br from-slate-600 via-slate-600 to-slate-900">
        {children}
      </main>
    </>
  );
}
