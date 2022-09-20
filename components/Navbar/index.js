export default function Navbar({ children, className, showMenu }) {
  return (
    <nav
      className={
        (showMenu ? 'block ' : 'hidden ') +
        'absolute top-0 bottom-0 left-0 right-0 z-40 py-20 bg-white md:block md:static md:bg-inherit md:backdrop-blur-0 bg-opacity-40 backdrop-blur-sm md:py-0'
      }
    >
      <ul className="flex flex-col items-center gap-4 mx-auto font-bold text-black md:text-white md:flex-row w-fit">
        {children}
      </ul>
    </nav>
  );
}
