export type Link = { name: string; href: string; isPublic?: boolean };

// Navigation items
export const navigation: Link[] = [
  { name: 'Accueil', href: '/', isPublic: true },
  { name: 'Sprint actuel', href: '/current-sprint' },
  { name: 'Sprints précedents', href: '/previous-sprints' },
  { name: 'Réglages', href: '/settings' },
];

export function getLinks(isLogged: boolean): Link[] {
  return isLogged ? navigation : navigation.filter((path) => path.isPublic);
}
