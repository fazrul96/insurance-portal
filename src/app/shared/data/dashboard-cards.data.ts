export interface CardItem {
  title: string;
  description: string;
  route?: string;
}

export const DASHBOARD_CARDS_PRODUCTS: CardItem[] = [
  {
    title: 'General Insurance',
    description: 'Explore a wide range of policies for home, car, and other valuable assets to safeguard your life and property.',
  },
  {
    title: 'Life Insurance',
    description: 'Secure your family’s future with life insurance. Start, manage, or update your policies to ensure peace of mind.',
  },
  {
    title: 'Individual Insurance',
    description: 'Find customized insurance options that are tailored to your specificnee ds. Manage your individual policies with ease.',
  }
];

export const DASHBOARD_CARDS: CardItem[] = [
  {
    title: 'Policy Purchase',
    description: 'Start a new policy or browse available options.',
    route: '/policy-purchase'
  },
  {
    title: 'Policy Servicing',
    description: 'Update, renew, or cancel your existing policies.',
    route: '/policy-servicing'
  },
  {
    title: 'Claim Management',
    description: 'Submit and manage your insurance claims.',
    route: '/claim-management'
  }
];
