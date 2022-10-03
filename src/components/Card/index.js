import ColoredText from '../ColoredText';

const colors = {
  blue: 'bg-blue-500/30 text-blue-300',
  green: 'bg-green-500/30 text-green-300',
  purple: 'bg-violet-500/30 text-violet-300',
  rose: 'bg-rose-500/30 text-rose-300',
  sky: 'bg-sky-500/30 text-sky-300',
  yellow: 'bg-yellow-500/30 text-yellow-300'
};

const markColors = {
  blue: '[&_mark]:text-blue-400',
  green: '[&_mark]:text-green-400',
  purple: '[&_mark]:text-violet-400',
  rose: '[&_mark]:text-rose-400',
  sky: '[&_mark]:text-sky-400',
  yellow: '[&_mark]:text-yellow-400'
};

export default function Card ({ color, children, Icon, id, title }) {
  return (
    <article
      className={`p-3 h-48 leading-7 transition-colors duration-300 rounded-3xl bg-zinc-700 hover:bg-zinc-600 group [&_mark]:bg-inherit [&_mark]:font-bold ${markColors[color]}`}
      id={id}
    >
      <h2 className="flex flex-row items-center gap-2 mb-2 text-2xl text-center md:text-left">
        <div
          className={`p-2 transition-colors duration-300 rounded-full ${colors[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <ColoredText bold color={color}>
          {title}
        </ColoredText>
      </h2>
      {children}
    </article>
  );
}
