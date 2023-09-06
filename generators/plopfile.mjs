// TODO fix plopfile isn't following how I organize my pages and components
export default function (plop) {
  plop.setGenerator('component', {
    description: 'create new component structure',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'templates/component-stories.tsx.hbs',
      },
    ],
  });

  plop.setGenerator('page', {
    description: 'create new page structure',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'page name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{dashCase name}}.tsx',
        templateFile: 'templates/page.tsx.hbs',
      },
    ],
  });
}
