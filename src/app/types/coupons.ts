export interface Coupon {
  id: number;
  value: number;
  isFlat: boolean;
  code: string;
  description: string;
}

export const couponsData: Coupon[] = [
  {
    id: 1,
    value: 10,
    isFlat: false,
    code: 'SAVE10',
    description: '10% off on your purchase',
  },
  {
    id: 2,
    value: 100,
    isFlat: true,
    code: 'FLAT100',
    description: '$100 off on any order',
  },
  {
    id: 3,
    value: 25,
    isFlat: false,
    code: 'MEGA25',
    description: '25% off on electronics',
  },
  {
    id: 4,
    value: 1000,
    isFlat: true,
    code: 'SAVE50',
    description: '$50 off on any order',
  },
  {
    id: 5,
    value: 15,
    isFlat: false,
    code: 'NEW15',
    description: '15% off for new customers',
  },
];
