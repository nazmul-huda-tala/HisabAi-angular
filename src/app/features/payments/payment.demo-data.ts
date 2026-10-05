import { Payment } from './models/payment.model';

/** TEMPORARY static demo data for the Payments module — replace once PaymentService is wired to the API. */
export const DEMO_PAYMENTS: Payment[] = [
  { id: 1, partyType: 'customer', partyId: 2, partyName: 'করিম ট্রেডার্স', amount: 5000, method: 'bkash', date: '2026-09-11', note: 'আংশিক পেমেন্ট' },
  { id: 2, partyType: 'supplier', partyId: 1, partyName: 'এসিআই ট্রেডিং লিমিটেড', amount: 20000, method: 'bank', date: '2026-09-12', note: 'মাসিক কিস্তি' },
];
