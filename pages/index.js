import Link from 'next/link';
import Button from '../components/Button';
import ColoredText from '../components/ColoredText';
import Feature from '../components/Feature';
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
        ¡Puedes crear tu grupo para compartirlo o unirte a uno que otra persona
        haya creado!
        <br />
        <br />
        Para unirte a un grupo, solo necesitas que el creador o algún miembro lo
        comparta contigo.
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
          <p className="self-start mb-12 text-3xl font-semibold">
            Comparte gastos de la manera más <br /> simple posible
          </p>
          {status === 'authenticated' ? (
            <Link href="/groups">
              <Button className="px-8 py-4 text-4xl !rounded-full" color="rose">
                Ver mis grupos
              </Button>
            </Link>
          ) : (
            <Button
              className="px-8 py-4 text-4xl !rounded-full"
              onClick={() => openLoginModal()}
            >
              ¡Comenzar!
            </Button>
          )}
        </div>
        <div className="h-56 md:relative md:h-[26rem]">
          <img
            src="/sharing-expenses.svg"
            className="w-full h-full"
            alt="Group sharing expenses"
          />
        </div>
      </section>
      <Feature color="darkorange" id="simple" title="Simple">
        <div className="flex flex-col gap-4 md:flex-row">
          {steps.map((step, idx) => (
            <StepCard key={idx + 1} step={idx + 1} {...step} />
          ))}
        </div>
      </Feature>
      <Feature
        color="green"
        id="transparent"
        img={{
          src: '/transparent.svg',
          alt: 'Transparente',
        }}
        title="Transparente"
        romboid
      >
        <p className="w-full my-auto text-3xl font-semibold md:text-right [&_span]:text-green-300">
          ¡Cualquier miembro puede <span>añadir</span>, <span>editar</span> o{' '}
          <span>eliminar</span> gastos del grupo!
        </p>
      </Feature>
      <Feature
        color="rose"
        id="functional"
        imagePosition="left"
        img={{
          src: '/save-time.svg',
          alt: 'Ahorrar tiempo',
        }}
        title="Funcional"
        romboid
      >
        <p className="w-full my-auto text-3xl font-semibold text-left [&>span]:text-rose-900">
          Añade <span>gastos</span> y <span>olvídate</span> del resto.
          <br />
          <br />¡
          <span>
            Cost<i>D</i>
          </span>{' '}
          calculará cuánto debe cada miembro sin que tu tengas que hacer{' '}
          <span>nada</span>!
        </p>
      </Feature>
      <Feature
        color="sky"
        id="efficient"
        img={{
          src: '/minimize-movements.svg',
          alt: 'Minimizar movimientos',
        }}
        title="Eficiente"
        romboid
      >
        <p className="w-full my-auto text-3xl font-semibold md:text-right text-sky-900 [&>span]:text-sky-200">
          Paga lo justo y <span>minimiza</span> las transacciones.
          <br />
          <br />
          <span>
            Cost<i>D</i>
          </span>{' '}
          <span>minimizará</span> las transacciones para que todos paguen lo
          justo el <span>mínimo</span> número de veces.
        </p>
      </Feature>
      <Feature
        color="purple"
        id="free"
        imagePosition="left"
        img={{
          src: '/free.svg',
          alt: 'Gratis',
        }}
        title="Gratis"
        romboid
      >
        <p className="w-full my-auto text-3xl font-semibold text-white [&_span]:text-purple-400">
          Cualquiera puede utilizar{' '}
          <span>
            Cost<i>D</i>
          </span>{' '}
          sin ningún tipo de restricción.
          <br />
          <br />
          ¡Todas las <span>características</span> están disponibles para{' '}
          <span>todos</span>!
        </p>
      </Feature>
      <ul>
        <h1>TODOs</h1>
        <li>
          Añadir imagen de como queda una gráfica y explicando que la app te
          muestra gráficamente los saldos
        </li>
        <li>
          ¡Úsalo en cualquier dispositivo! Imagenes de un PC, tablet y móvil con
          la web
        </li>
      </ul>
    </div>
  );
}
