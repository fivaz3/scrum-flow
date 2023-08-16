export default {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '**/*.{js,jsx,json,ts,tsx}': ['npm run format', 'npm run lint . --fix'],
};
