import Link from 'next/link';
import Button from '../components/Button';
import ColoredText from '../components/ColoredText';
import StepCard from '../components/StepCard';
import Typed from '../components/Typed';
import useAuth from '../hooks/useAuth';
import { useLoginModal } from '../hooks/useLoginModal';

const steps = [
  {
    title: 'Inicia sesión',
    description: 'Inicia sesión con tu cuenta de Google o Twitter.',
    image: { src: '/login.svg', alt: 'Iniciar sesión' },
  },
  {
    title: 'Crea un grupo o únete a uno',
    description: (
      <>
        Es muy facil, ¡simplemente clica en el botón &quot;Compartir&quot; para
        enviarselo a quien quieras!
      </>
    ),
    image: { src: '/share-group.svg', alt: 'Compartir grupo' },
  },
  {
    title: 'Añade gastos',
    description: (
      <>
        Añade gastos a tu grupo. <br />
        ¡Puedes decidir quien es parte de ese gasto!
      </>
    ),
    image: { src: '/add-expense.svg', alt: 'Añadir gasto' },
  },
  {
    title: (
      <>
        Deja que Cost<i>D</i> haga el resto
      </>
    ),
    description: (
      <>
        Cost<i>D</i> ajustará los gastos de cada miembro del grupo y minimizará
        las transacciones, de tal manera que todos paguen lo justo.
      </>
    ),
    image: { src: '/calculator-0.svg', alt: 'Calculadora a 0' },
  },
];

export default function HomePage({ groups }) {
  const { status } = useAuth();

  const { openLoginModal } = useLoginModal();

  return (
    <div>
      <section className="flex flex-col items-center gap-16 mb-24 md:gap-0 md:justify-between md:flex-row">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-5xl font-bold text-center md:text-left md:mb-12 md:text-7xl">
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
              <Button className="px-8 py-4 text-4xl rounded-3xl" color="rose">
                Ir a grupos
              </Button>
            </Link>
          ) : (
            <Button
              className="px-8 py-4 text-4xl rounded-3xl"
              onClick={() => openLoginModal()}
            >
              ¡Comenzar!
            </Button>
          )}
        </div>
        <div className="h-56 md:relative md:h-[26rem]">
          <img
            src="/sharing_expenses.svg"
            className="w-full h-full"
            alt="Group sharing expenses"
          />
        </div>
      </section>
      <section className="mb-12">
        <h2 className="mb-10 text-5xl text-center">
          <ColoredText bold color="sky">
            Simple
          </ColoredText>
        </h2>
        <div className="flex flex-row gap-4">
          {steps.map((step, idx) => (
            <StepCard key={idx + 1} step={idx + 1} {...step} />
          ))}
        </div>
      </section>
      <ol>
        <h1>TODOs</h1>
        <li>Paso a paso de como usar la app, de manera atractiva</li>
        <li>
          Añadir subtitulo: Una aplicación para ayudarte a compartir gastos en
          grupo
        </li>
        <li>
          Simple: Solo tienes que meter gastos, la app lo hace todo por ti
        </li>
        <li>Todos ven los gastos de todos</li>
      </ol>
    </div>
  );
}
