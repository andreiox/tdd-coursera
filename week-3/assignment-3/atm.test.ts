import test from 'ava';
import sinon from 'sinon';

import { Account, ATM } from './atm';

test('should create account with no balance', t => {
	const account = new Account();

	t.is(account.balance, 0);
});

test('should deposit money', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);
	t.is(account.balance, 0);

	account.deposit(10);
	t.is(account.balance, 10);
	t.true(spy.calledWith(account));
});

test('should not deposit negative value', t => {
	const account = new Account();
	t.is(account.balance, 0);

	const result = account.deposit(-10);
	t.false(result);
	t.is(account.balance, 0);
});

test('should withdraw money', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);
	account.deposit(10);
	t.is(account.balance, 10);

	account.withdraw(3);
	t.is(account.balance, 7);
	t.true(spy.calledWith(account));
});

test('should not withdraw more than balance', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);
	account.deposit(10);
	t.is(account.balance, 10);

	const result = account.withdraw(11);
	t.false(result);
	t.is(account.balance, 10);
});

test('should autenticate user', t => {
	const spy = sinon.spy();
	const spy2 = sinon.spy();
	const atm = new ATM({
		hardware: { getAccountNumberByCard: spy },
		remote: { getAccount: spy2 },
	} as any);

	const result = atm.login();

	t.is(result, 'User authenticated');
	t.truthy(atm.account);
});

test('should not be able to login due hardware fail', t => {
	const getAccountNumberByCard = () => {
		throw Error;
	};
	const atm = new ATM({ hardware: { getAccountNumberByCard } } as any);

	const result = atm.login();
	t.is(result, 'Not able to authenticate user');
});

test('should deposit on ATM', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);

	const readEnvolope = sinon.spy();
	const atm = new ATM({ hardware: { readEnvolope } } as any);
	sinon.stub(atm, 'getAccount').returns(account);

	atm.login();

	const result = atm.deposit(10);
	t.is(result, 'Deposit successful');
});

test('should not be able to read envelope', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);

	const readEnvolope = (value: number) => {
		throw Error;
	};
	const atm = new ATM({ hardware: { readEnvolope } } as any);
	sinon.stub(atm, 'getAccount').returns(account);

	atm.login();

	const result = atm.deposit(10);
	t.is(result, 'Deposit not successful');
});

test('should withdraw on ATM', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);

	const readEnvolope = sinon.spy();
	const deliverMoney = sinon.spy();
	const atm = new ATM({ hardware: { readEnvolope, deliverMoney } } as any);
	sinon.stub(atm, 'getAccount').returns(account);

	atm.login();
	atm.deposit(10);

	const result = atm.withdraw(5);
	t.is(result, 'Take the money!');
});

test('should not withdraw on ATM because of balance', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);

	const readEnvolope = sinon.spy();
	const deliverMoney = sinon.spy();
	const atm = new ATM({ hardware: { readEnvolope, deliverMoney } } as any);
	sinon.stub(atm, 'getAccount').returns(account);

	atm.login();
	atm.deposit(10);

	const result = atm.withdraw(11);
	t.is(result, 'Want to borrow money, cause you dont have it!');
});

test('should not withdraw on ATM because of hardware error', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);

	const readEnvolope = sinon.spy();
	const deliverMoney = (value: number) => {
		throw Error;
	};

	const atm = new ATM({ hardware: { readEnvolope, deliverMoney } } as any);
	sinon.stub(atm, 'getAccount').returns(account);

	atm.login();
	atm.deposit(10);

	const result = atm.withdraw(5);
	t.is(result, 'Hardware error');
});

test('should display balance on ATM', t => {
	const spy = sinon.spy();
	const account = new Account({ saveAccount: spy } as any);

	const readEnvolope = sinon.spy();
	const deliverMoney = sinon.spy();
	const atm = new ATM({ hardware: { readEnvolope, deliverMoney } } as any);
	sinon.stub(atm, 'getAccount').returns(account);

	atm.login();
	atm.deposit(10);

	const result = atm.balance();
	t.is(result, 'Your balance is R$ 10');
});
