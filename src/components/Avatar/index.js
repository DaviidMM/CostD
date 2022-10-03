export default function Avatar ({
  photo = '',
  squared = true,
  bordered = true,
  username = ''
}) {
  const roundedClasses = squared ? 'rounded-xl md:rounded-2xl' : 'rounded-full';
  const borderClasses = bordered ? 'border md:border-2 border-black' : '';
  const sizeClasses = bordered ? 'w-9 h-9 md:w-11 md:h-11' : 'w-full h-full';

  return (
    <div
      className={`relative cursor-pointer flex justify-center items-center w-10 h-10 md:w-12 md:h-12 overflow-hidden group ${roundedClasses}`}
    >
      <span className="absolute z-30 w-full h-full transition-opacity avatar-bg bg-gradient-to-br from-orange-400 to-orange-800 group-hover:opacity-70 duration-[250ms] "></span>
      {photo
        ? (
        <img
          className={`${sizeClasses} ${borderClasses} ${roundedClasses} z-30`}
          src={photo}
          alt="User icon"
          referrerPolicy="no-referrer"
        />
          )
        : (
        <span className="z-30 text-2xl font-semibold leading-none select-none">
          {username.charAt(0).toUpperCase()}
        </span>
          )}
    </div>
  );
}
