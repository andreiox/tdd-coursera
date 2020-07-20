interface RemoteService {
	getAccount(id: number): Account;
	saveAccount(account: Account): boolean;
}

interface HardwareInterface {
	getAccountNumberByCard(): number;
	deliverMoney(value: number): void;
	readEnvolope(value: number): void;
}

export class Account {
	balance: number;
	remoteService: RemoteService;

	constructor(remoteService?: RemoteService) {
		this.balance = 0;
		this.remoteService = remoteService;
	}

	deposit(value: number): boolean {
		if (value <= 0) return false;

		this.balance += value;
		this.remoteService.saveAccount(this);

		return true;
	}

	withdraw(value: number): boolean {
		if (value > this.balance) return false;

		this.balance -= value;
		this.remoteService.saveAccount(this);

		return true;
	}
}

export class ATM {
	account: Account;
	hardware: HardwareInterface;
	remoteService: RemoteService;

	constructor(data?: { hardware?: HardwareInterface; remote?: RemoteService }) {
		this.hardware = data?.hardware;
		this.remoteService = data?.remote;
	}

	getAccount(): Account {
		const number: number = this.hardware.getAccountNumberByCard();
		const account = new Account(this.remoteService);
		account.remoteService.getAccount(number);

		return account;
	}

	login() {
		try {
			this.account = this.getAccount();
			return 'User authenticated';
		} catch {
			return 'Not able to authenticate user';
		}
	}

	deposit(value: number): string {
		try {
			this.hardware.readEnvolope(value);
			const result = this.account.deposit(value);

			if (result) return 'Deposit successful';
		} catch {}

		return 'Deposit not successful';
	}

	withdraw(value: number): string {
		try {
			const result = this.account.withdraw(value);
			this.hardware.deliverMoney(value);

			return result
				? 'Take the money!'
				: 'Want to borrow money, cause you dont have it!';
		} catch {
			return 'Hardware error';
		}
	}

	balance(): string {
		return `Your balance is R$ ${this.account.balance}`;
	}
}
