export default function Dots() {
  return (
    <div className="flex flex-row self-center justify-between w-12 mx-auto">
      <span className="w-3 h-3 bg-transparent rounded-full bg-gradient-to-br from-orange-500 to-orange-800 animate-longBounce"></span>
      <span className="bg-gradient-to-br from-orange-500 to-orange-800 w-3 h-3 bg-transparent rounded-full animate-longBounce [animation-delay:100ms]"></span>
      <span className="bg-gradient-to-br from-orange-500 to-orange-800 w-3 h-3 bg-transparent rounded-full animate-longBounce [animation-delay:200ms]"></span>
    </div>
  );
}
