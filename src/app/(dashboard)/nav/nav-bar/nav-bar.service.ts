export type Link = { name: string; href: string; isPublic?: boolean };

export const navigation: Link[] = [
  { name: 'Accueil', href: '/', isPublic: true },
  { name: 'Sprint actuel', href: '/current-sprint' },
  { name: 'Sprints précedents', href: '/previous-sprints' },
  { name: 'Réglages', href: '/settings' },
];

export function getPrivateLinks(): Link[] {
  return navigation.filter((path) => !path.isPublic);
}
