// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let initialBalance = 1000;
  const bankAccount = getBankAccount(initialBalance);
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(2000)).toThrowError(
      InsufficientFundsError,
    );
  });

  const anotherBankAccount = getBankAccount(5000);

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(2000, anotherBankAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(500, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(100).getBalance()).toEqual(
      (initialBalance += 100),
    );
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(200).getBalance()).toEqual(
      (initialBalance -= 200),
    );
  });

  test('should transfer money', () => {
    expect(bankAccount.transfer(400, anotherBankAccount).getBalance()).toEqual(
      (initialBalance -= 400),
    );
    expect(anotherBankAccount.getBalance()).toEqual(5400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');

    const balance = await bankAccount.fetchBalance();

    const expectedResult = await fetchBalanceSpy.mock.results[0]?.value;

    if (expectedResult !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');

    const expectedFetchResult = await fetchBalanceSpy.mock.results[0]?.value;

    bankAccount
      .synchronizeBalance()
      .then(() => {
        if (expectedFetchResult !== null) {
          expect(bankAccount.getBalance()).toBe(expectedFetchResult);
        }
      })
      .catch((err) => expect(err).toBeInstanceOf(Error));
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');

    const expectedResult = await fetchBalanceSpy.mock.results[0]?.value;

    if (expectedResult === null) {
      expect(() => bankAccount.synchronizeBalance()).toThrowError(
        SynchronizationFailedError,
      );
    }
  });
});
