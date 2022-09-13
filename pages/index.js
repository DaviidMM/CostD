import Link from 'next/link';
import Button from '../components/Button';
import ColoredText from '../components/ColoredText';
import Typed from '../components/Typed';
import useAuth from '../hooks/useAuth';
import { useLoginModal } from '../hooks/useLoginModal';

export default function HomePage({ groups }) {
  const { status } = useAuth();

  const { openLoginModal } = useLoginModal();

  return (
    <div>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-left md:text-7xl">
            <ColoredText color="sky">Organiza</ColoredText>{' '}
            <ColoredText color="orange">gastos</ColoredText>
            <br />
            con tus
            <br />
            <Typed
              className="block h-24"
              color="purple"
              gradientColor
              texts={['amigos', 'familiares', 'compañeros']}
              typeSpeed={100}
            />
          </h1>
          {status === 'authenticated' ? (
            <Link href="/groups">
              <Button className="px-8 py-4 text-4xl">Ir a grupos</Button>
            </Link>
          ) : (
            <Button
              className="px-8 py-4 text-4xl"
              onClick={() => openLoginModal()}
            >
              ¡Comenzar!
            </Button>
          )}
        </div>
        <div className="h-56 md:relative md:h-96">
          <img
            src="/sharing_expenses.svg"
            className="w-full h-full"
            alt="Group sharing expenses"
          />
        </div>
      </div>
      <ol>
        <h1>TODOs</h1>
        <li>
          Panel inicial con una descripción del la app y una imagen con estilo
          moderno al lado.
        </li>
        <li>Paso a paso de como usar la app, de manera atractiva</li>
        <li>
          Boton de &quot;Comenzar&quot; y que te lleve a login o a tus grupos
          creados
        </li>
        <li>
          Simple: Solo tienes que meter gastos, la app lo hace todo por ti
        </li>
        <li>Todos ven los gastos de todos</li>
      </ol>
    </div>
  );
}
