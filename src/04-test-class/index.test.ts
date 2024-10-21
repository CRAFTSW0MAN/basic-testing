import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(300);
    expect(account.getBalance()).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(300);
    expect(() => account.withdraw(350)).toThrowError(InsufficientFundsError);
    expect(() => account.withdraw(350)).toThrowError(
      'Insufficient funds: cannot withdraw more than 300',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(300);
    const account2 = getBankAccount(100);
    expect(() => account1.transfer(450, account2)).toThrowError(
      InsufficientFundsError,
    );
    expect(() => account1.transfer(450, account2)).toThrowError(
      'Insufficient funds: cannot withdraw more than 300',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(300);
    expect(() => account.transfer(350, account)).toThrowError(
      TransferFailedError,
    );
    expect(() => account.transfer(350, account)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(300);
    const amount = 50;
    expect(account.deposit(amount).getBalance()).toBe(350);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(300);
    const amount = 50;
    expect(account.withdraw(amount).getBalance()).toBe(250);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(300);
    const account2 = getBankAccount(50);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(250);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(75).mockReturnValueOnce(1);
    const account = getBankAccount(300);
    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
    expect(balance).toBe(75);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(75).mockReturnValueOnce(1);
    const account = getBankAccount(300);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(75);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(0);
    const account = getBankAccount(300);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
