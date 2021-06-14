import { DEFAULT_CURRENCY } from '../constants';
import {
  getCurrencySymbol,
  getLocalString,
  stripNonDigits,
  toCurrencyString,
  getProperlyRounded,
} from './currencies';

test(' getCurrencySymbol returns a symbol if code is correct', () => {
  const currencySymbol = getCurrencySymbol(DEFAULT_CURRENCY);
  expect(currencySymbol).toBe('$');
});

describe('getLocalString', () => {
  test('with currency', () => {
    const currencySymbol = getLocalString({
      amount: 100000,
      currency: DEFAULT_CURRENCY,
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
    const currencySymbol = toCurrencyString({
      amount: 100000,
      currency: DEFAULT_CURRENCY,
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

describe('getProperlyRounded', () => {
  test('appends the precision', () => {
    const string = '2323';
    expect(getProperlyRounded(string)).toBe('2323.00');
  });

  test('appends the precision to formatted string and removes formatting', () => {
    const string = '10,000';
    expect(getProperlyRounded(string)).toBe('10000.00');
  });

  test('can change the precision', () => {
    const string = '2323';
    expect(getProperlyRounded(string, 3)).toBe('2323.000');
  });

  test('pads the precision', () => {
    const string = '2323.1';
    expect(getProperlyRounded(string)).toBe('2323.10');
  });

  test('returns empty string if wrong stirng passed', () => {
    const wrongString = 'adasdasdasdada';
    expect(getProperlyRounded(wrongString)).toBe('');
  });
});
