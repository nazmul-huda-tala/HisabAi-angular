const BANGLA_DIGITS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
};

/** Converts any ASCII digits inside a string/number to Bangla digits. */
export function toBanglaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BANGLA_DIGITS[d]);
}

/** Formats a number as Bangla-digit Taka with Indian/Bangladeshi digit grouping, e.g. ৳ ১২,৪৫০ */
export function formatTaka(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const rounded = Math.round(Math.abs(amount));
  const whole = rounded.toString();
  const lastThree = whole.length > 3 ? whole.slice(-3) : whole;
  const rest = whole.length > 3 ? whole.slice(0, -3) : '';
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree : lastThree;
  return `${sign}৳ ${toBanglaDigits(grouped)}`;
}

/** Formats a plain count/number using Bangla digits (no currency symbol, no grouping). */
export function formatCount(value: number): string {
  return toBanglaDigits(value);
}

/** Formats an ISO date (yyyy-mm-dd) as a short Bangla-friendly label, e.g. "১০ সেপ্টেম্বর ২০২৬". */
const BN_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
];

export function formatDateBn(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return `${toBanglaDigits(d.getDate())} ${BN_MONTHS[d.getMonth()]} ${toBanglaDigits(d.getFullYear())}`;
}
