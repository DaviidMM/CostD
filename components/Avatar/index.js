export default function Avatar({
  photo = '',
  squared = true,
  bordered = true,
  username = '',
}) {
  const roundedClasses = squared ? 'rounded-2xl' : 'rounded-full';
  const borderClasses = bordered ? 'border-2 border-black' : '';
  const sizeClasses = bordered ? 'w-11 h-11' : 'w-full h-full';

  return (
    <div
      className={`relative cursor-pointer flex justify-center items-center w-12 h-12 overflow-hidden group ${roundedClasses}`}
    >
      <span className="absolute z-40 w-full h-full transition-opacity avatar-bg bg-gradient-to-br from-orange-400 to-orange-800 group-hover:opacity-70 duration-[250ms] "></span>
      {photo ? (
        <img
          className={`${sizeClasses} ${borderClasses} ${roundedClasses} z-50`}
          src={photo}
          alt="User icon"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="z-50 text-2xl font-semibold leading-none select-none">
          {username.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
