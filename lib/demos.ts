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
        name: 'Documents',
        slug: 'documents',
        description: 'A collection of documents',
      },
      {
        name: 'Insights',
        slug: 'insights',
        description: 'Insights about your data',
      },
      {
        name: 'Credentials',
        slug: 'credentials',
        description: 'Credentials used to validate user insights',
      },
    ]
  },
];
