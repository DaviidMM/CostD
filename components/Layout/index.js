import Header from '../Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="h-screen">{children}</main>
    </>
  );
}
