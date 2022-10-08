import Link from 'next/link';
import Button from '../src/components/Button';
import ColoredText from '../src/components/ColoredText';
import Card from '../src/components/Card';
import StepCard from '../src/components/StepCard';
import Typed from '../src/components/Typed';
import useAuth from '../src/hooks/useAuth';
import { useLoginModal } from '../src/hooks/useLoginModal';
import useFeatures from '../src/hooks/useFeatures';
import useSteps from '../src/hooks/useSteps';
import Feature from '../src/components/Feature';

export default function HomePage() {
  const { status } = useAuth();
  const features = useFeatures();
  const steps = useSteps();

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
            Comparte gastos de la manera más <br />{' '}
            <ColoredText color="orange">simple</ColoredText> posible.
          </p>
          {status === 'authenticated' ? (
            <Link href="/groups">
              <Button className="px-8 py-4 text-4xl !rounded-3xl" color="rose">
                Ver mis grupos
              </Button>
            </Link>
          ) : (
            <Button
              color="rose"
              className="px-8 py-4 text-4xl !rounded-3xl"
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
      <section className="grid mb-24 md:gap-6 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        {features.map((feature) => (
          <Card key={feature.id} {...feature}>
            {feature.description}
          </Card>
        ))}
      </section>
      <section className="mb-24" id="simple">
        <h2 className="mb-10 text-5xl text-center">
          <ColoredText bold color="orange">
            Cost<i>D</i> en 4 pasos
          </ColoredText>
        </h2>
        <div className="flex flex-col gap-4 md:flex-row">
          {steps.map((step, idx) => (
            <StepCard key={idx + 1} step={idx + 1} {...step} />
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 gap-8 mb-24 xl:grid-cols-3">
        <Feature
          description={
            <>
              Cost<i>D</i> está disponible en tu móvil, tablet, ordenador...
              <br />
              ¡en cualquier dispositivo con navegador web!
            </>
          }
          img={{
            src: '/multiplatform.svg',
            alt: 'Multiplatforma'
          }}
          title={
            <>
              Utiliza Cost<i>D</i>
              <br />
              <ColoredText bold color="blue">
                donde tú quieras
              </ColoredText>
            </>
          }
        />
        <Feature
          description={
            <>
              Cost<i>D</i> te envía notificaciones cuando alguien añade, edita o
              borra movimientos
            </>
          }
          img={{
            src: '/send-notifications.svg',
            alt: 'Recibe notificaciones'
          }}
          title={
            <>
              Recibe{' '}
              <ColoredText bold color="purple">
                notificaciones
              </ColoredText>
              <br />
              de tus grupos
            </>
          }
        />
        <Feature
          description={
            <>
              Cost<i>D</i> actualiza en tiempo real los cambios que haya en tu
              grupo.
              <br />
              ¡Cuando alguien añada un movimiento lo verás en seguida!
            </>
          }
          img={{
            src: '/anyone-can-use.svg',
            alt: 'Cualquiera puede usarlo'
          }}
          title={
            <>
              Visualiza los{' '}
              <ColoredText bold color="green">
                cambios
              </ColoredText>{' '}
              que haya en el grupo en{' '}
              <ColoredText bold color="green">
                tiempo real
              </ColoredText>
            </>
          }
        />
      </section>
      {status === 'authenticated' ? (
        <Link href="/groups">
          <Button
            className="mx-auto px-8 py-4 text-4xl !rounded-3xl"
            color="rose"
          >
            Ver mis grupos
          </Button>
        </Link>
      ) : (
        <Button
          color="rose"
          className="mx-auto px-8 py-4 text-4xl !rounded-3xl"
          onClick={() => openLoginModal()}
        >
          ¡Comenzar!
        </Button>
      )}
    </div>
  );
}
