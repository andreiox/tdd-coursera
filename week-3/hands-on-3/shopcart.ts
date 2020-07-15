export class Item {
	name: string;
	value: number;

	constructor(name: string, value: number) {
		this.name = name;
		this.value = value;
	}
}

export class Shopcart {
	total: number;
	items: Item[];
	observers: Function[];

	constructor() {
		this.total = 0;
		this.items = [];
		this.observers = [];
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}

	add(item: Item): void {
		this.items.push(item);
		this.total += item.value;

		this.observers.forEach(observer => {
			try {
				observer.call(this, item.name, item.value);
			} catch {}
		});
	}

	addObserver(f: Function): void {
		this.observers.push(f);
	}
}
