export type Link = { name: string; href: string; isPublic?: boolean };

export const navigation: Link[] = [
  { name: 'Accueil', href: '/', isPublic: true },
  { name: 'Sprint actuel', href: '/sprint' },
  { name: 'Rapport des sprints', href: '/report' },
  { name: 'Plan de travail', href: '/schedules' },
];

export function getPrivateLinks(): Link[] {
  return navigation.filter((path) => !path.isPublic);
}
