export interface TablePolicy {
  product: string;
  contractNumber: number;
  desc: string;
  website: string;
  endingAt: string;
  status: 'negative' | 'active' | 'positive' | 'critical';
  statusText: string;
}

export const TABLE_POLICY: TablePolicy[] = [
  {
    product: 'Car',
    contractNumber: 1234,
    desc: 'This is a contract',
    website: 'www.example.com',
    endingAt: '1/3/2020',
    status: 'negative',
    statusText: 'open',
  },
  {
    product: 'Health',
    contractNumber: 2423,
    desc: 'This is another contract',
    website: 'www.allianz.com',
    endingAt: '4/2/2020',
    status: 'active',
    statusText: 'accepted',
  },
  {
    product: 'Car',
    contractNumber: 353455,
    desc: 'Lorem ipsum dolor sit amet, csis libero. ',
    website: 'www.example.com',
    endingAt: '6/2/2020',
    status: 'positive',
    statusText: 'accepted',
  },
  {
    product: 'Home',
    contractNumber: 22344,
    desc: 'This is a description of a contract',
    website: 'www.example.org',
    endingAt: '1/2/2027',
    status: 'critical',
    statusText: 'rejected',
  },
];
