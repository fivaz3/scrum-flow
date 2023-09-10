export type Path = { name: string; href: string };

// Navigation items
export const navigation: Path[] = [
  { name: 'Accueil', href: '/' },
  { name: 'Sprint actuel', href: '/current-sprint' },
  { name: 'Sprints précedents', href: '/previous-sprints' },
  { name: 'Réglages', href: '/settings' },
];
