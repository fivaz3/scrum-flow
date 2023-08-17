export type Issue = {
  id: string;
  name: string;
};
// export async function getData(): any {
//   const res = await fetch('https://api.atlassian.com/oauth/token/accessible-resources');
//
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }
//
//   return res.json();
// }
