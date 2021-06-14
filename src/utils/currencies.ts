export type TCurrencyStringConfig = {
  amount: string | number,
  precision?: number,
  currency?: string
};

export const getLocalString = ({
  amount,
  precision = 2,
  currency,
}: TCurrencyStringConfig): string => {
  const parsed = parseFloat(amount as string);

  if (Number.isNaN(parsed)) {
    return '';
  }

  return new Intl.NumberFormat('en-US', {
    style: currency ? 'currency' : 'decimal',
    currency,
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(parsed);
};

export const stripNonDigits = (string: string): string => string.replace(/[^0-9.]/g, '');

export const getProperlyRounded = (value: string | number, precision = 2): string => {
  const newVal = typeof value === 'string' ? stripNonDigits(value) : value;
  if (!newVal) {
    return '';
  }
  const coef = 10 ** precision;
  return (Math.round(Number(newVal) * coef) / coef).toFixed(precision);
};

export const getCurrencySymbol = (currency: string): string => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency,
}).format(1)[0];

export const toCurrencyString = ({
  amount,
  precision = 2,
  currency,
}: TCurrencyStringConfig): string => {
  let reservedVal: string = stripNonDigits(String(amount));
  if (!reservedVal) {
    return '';
  }

  const hasDot = reservedVal.includes('.');
  const fractional = reservedVal.split('.')[1];
  let precisionLength = fractional?.length || 0;

  if (fractional && fractional.length > precision) {
    precisionLength = precision;
    reservedVal = getProperlyRounded(reservedVal, precision);
  }

  const converted = getLocalString({
    amount: reservedVal,
    precision: precisionLength,
    currency,
  });

  const postfix = (hasDot && !fractional) ? '.' : '';
  return `${converted}${postfix}`;
};
