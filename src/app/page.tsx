import { CalendarIcon, ChartBarIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';
import LogoType from '@/components/logo-mark';
import StartButton from '@/app/start-button';
import { Suspense } from 'react';
import LoginButton from '@/app/start-button/login-button';

const features = [
  {
    name: 'Graphique d’évolution de la maturité',
    description:
      ' Suivez la progression de votre équipe avec notre graphique interactif qui trace l’évolution du taux d’exactitude des estimations au fil du temps. Voyez comment votre équipe gagne en maturité et optimise ses performances !',
    icon: ChartBarIcon,
  },
  {
    name: 'Analyse des estimations de tâches',
    description:
      ' Obtenez un aperçu détaillé de chaque tâche du Sprint avec des informations précises sur l’exactitude des estimations. Idéal pour faciliter les discussions lors des rétrospectives de Sprint et identifier les problèmes rencontrés.',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Prédictions de temps de réalisation',
    description:
      'Planifiez efficacement avec notre outil de prédiction qui estime le temps nécessaire pour réaliser un ensemble de tâches. Prenez des décisions éclairées et optimisez la productivité de votre équipe.',
    icon: CalendarIcon,
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div>
              <svg
                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
            </div>

            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <LogoType className="text-3xl sm:h-10" />
                </div>
              </nav>
            </div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Enrichissez votre expérience avec</span>{' '}
                  <span className="block text-indigo-600 xl:inline">Jira Software</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                  commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Suspense fallback={<LoginButton />}>
                      <StartButton />
                    </Suspense>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
          />
        </div>
      </section>

      <section className="mt-14 mb-52">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Une meilleure façon d&apos;utiliser Jira
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus magnam voluptatum
            cupiditate veritatis in, accusamus quisquam.
          </p>
        </div>
      </section>

      <section
        className="pb-16 -mt-32 max-w-md mx-auto relative z-10 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
        aria-labelledby="contact-heading">
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          {features.map((link) => (
            <div key={link.name} className="flex flex-col bg-white rounded-2xl shadow-xl">
              <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                <div className="absolute top-0 p-5 inline-block bg-blue-600 rounded-xl shadow-lg transform -translate-y-1/2">
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium text-blue-gray-900">{link.name}</h3>
                <p className="mt-4 text-base text-blue-gray-500">{link.description}</p>
              </div>
              <div className="p-6 bg-blue-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                <a href="#" className="text-base font-medium text-blue-700 hover:text-blue-600">
                  Démarrer<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
