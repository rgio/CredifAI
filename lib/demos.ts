export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Data',
    items: [
      {
        name: 'Surveys',
        slug: 'data',
        description: 'A collection of surveys',
      },
      {
        name: 'Insights',
        slug: 'insights',
        description: 'Insights about survey results',
      },
      {
        name: 'Credentials',
        slug: 'credentials',
        description: 'Credentials used to validate users',
      },
    ]
  },
];
