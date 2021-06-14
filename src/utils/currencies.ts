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
  const [decimal, _fractional = ''] = reservedVal.split('.');
  let fractional = _fractional;

  if (fractional && fractional.length > precision) {
    fractional = fractional.slice(0, precision);
    reservedVal = `${decimal}.${fractional.slice(0, precision)}`;
  }

  const converted = getLocalString({
    amount: reservedVal,
    precision: fractional.length,
    currency,
  });

  const postfix = (hasDot && !fractional) ? '.' : '';
  return `${converted}${postfix}`;
};

export const appendPrecision = (amount: string, precision = 2): string => {
  if (!parseFloat(amount)) {
    return amount;
  }
  const [_decimal, fractional] = amount.split('.');
  const decimal = _decimal || '0';
  const defaultPrecision = '0'.repeat(precision);
  return fractional ? `${decimal}.${fractional.padEnd(precision, '0')}` : `${decimal}.${defaultPrecision}`;
};
