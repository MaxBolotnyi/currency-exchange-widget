import {
  getCurrencySymbol,
  getLocalString,
  stripNonDigits,
  toCurrencyString,
  appendPrecision,
} from './currencies';

test(' getCurrencySymbol returns a symbol if code is correct', () => {
  const currency = 'USD';
  const currencySymbol = getCurrencySymbol(currency);
  expect(currencySymbol).toBe('$');
});

describe('getLocalString', () => {
  test('with currency', () => {
    const currency = 'USD';
    const currencySymbol = getLocalString({
      amount: 100000,
      currency,
    });
    expect(currencySymbol).toBe('$100,000.00');
  });

  test('without currency', () => {
    const currencySymbol = getLocalString({
      amount: 100000,
    });
    expect(currencySymbol).toBe('100,000.00');
  });

  test('with changes precision', () => {
    const currencySymbol = getLocalString({
      precision: 3,
      amount: 100000,
    });
    expect(currencySymbol).toBe('100,000.000');
  });

  test('with wrong string returns empty string', () => {
    const currencySymbol = getLocalString({
      amount: 'asdasd',
    });
    expect(currencySymbol).toBe('');
  });

  test('accepts 0 as a value', () => {
    const currencySymbol = getLocalString({
      amount: '0',
    });
    expect(currencySymbol).toBe('0.00');
  });

  test('can parse numbers', () => {
    const currencySymbol = getLocalString({
      amount: '232asdasd',
    });
    expect(currencySymbol).toBe('232.00');
  });
});

test('stripNonDigits strips anything but digits and dots.', () => {
  const testSting = 'Anythinghere$100,000.00SomethingHERE';
  expect(stripNonDigits(testSting)).toBe('100000.00');
});

describe('toCurrencyString', () => {
  test('with currency', () => {
    const currency = 'USD';
    const currencySymbol = toCurrencyString({
      amount: 100000,
      currency,
    });
    expect(currencySymbol).toBe('$100,000');
  });

  test('without currency', () => {
    const currencySymbol = toCurrencyString({
      amount: 100000,
    });
    expect(currencySymbol).toBe('100,000');
  });

  test('cuts to the precision', () => {
    const currencySymbol = toCurrencyString({
      precision: 3,
      amount: '100000.33333333',
    });
    expect(currencySymbol).toBe('100,000.333');
  });

  test('with wrong string returns empty string', () => {
    const currencySymbol = toCurrencyString({
      amount: 'asdasd',
    });
    expect(currencySymbol).toBe('');
  });

  test('should leave dot in the end if any typed', () => {
    const currencySymbol = toCurrencyString({
      amount: '100000.',
    });
    expect(currencySymbol).toBe('100,000.');
  });
});

describe('appendPrecision', () => {
  test('appends the precision', () => {
    const string = '2323';
    expect(appendPrecision(string)).toBe('2323.00');
  });

  test('appends the precision to formatted string', () => {
    const string = '10,000';
    expect(appendPrecision(string)).toBe('10,000.00');
  });

  test('can change the precision', () => {
    const string = '2323';
    expect(appendPrecision(string, 3)).toBe('2323.000');
  });

  test('pads the precision', () => {
    const string = '2323.1';
    expect(appendPrecision(string)).toBe('2323.10');
  });

  test('returns original value if wrong stirng passed', () => {
    const wrongString = 'adasdasdasdada';
    expect(appendPrecision(wrongString)).toBe('adasdasdasdada');
  });
});
