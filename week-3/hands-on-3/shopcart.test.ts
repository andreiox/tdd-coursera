import test from 'ava';
import sinon from 'sinon';

import { Item, Shopcart } from './shopcart';

test('should be an empty shopcart', t => {
	const cart = new Shopcart();

	t.true(cart.isEmpty());
	t.is(cart.total, 0);
});

test('should be an shopcart with one item', t => {
	const cart = new Shopcart();
	const item = new Item('p1', 10.5);

	cart.add(item);

	t.false(cart.isEmpty());
	t.is(cart.total, item.value);
});

test('should be an shopcart with two items', t => {
	const cart = new Shopcart();
	const item1 = new Item('p1', 10.5);
	const item2 = new Item('p2', 2.5);

	cart.add(item1);
	cart.add(item2);

	t.false(cart.isEmpty());
	t.is(cart.total, item1.value + item2.value);
});

test('should add observer function to listen to cart add item', t => {
	const cart = new Shopcart();
	const item = new Item('p1', 10.5);

	const spy = sinon.spy();

	cart.addObserver(spy);
	cart.add(item);

	t.false(cart.isEmpty());
	t.is(cart.total, item.value);
	t.true(spy.called);
	t.true(spy.calledWith(item.name, item.value));
});

test('should add two observer functions to listen to cart add item', t => {
	const cart = new Shopcart();
	const item = new Item('p1', 10.5);

	const spy1 = sinon.spy();
	const spy2 = sinon.spy();

	cart.addObserver(spy1);
	cart.addObserver(spy2);
	cart.add(item);

	t.false(cart.isEmpty());
	t.is(cart.total, item.value);
	t.true(spy1.called);
	t.true(spy1.calledWith(item.name, item.value));
	t.true(spy2.called);
	t.true(spy2.calledWith(item.name, item.value));
});

test('should notify with one observer with error', t => {
	const cart = new Shopcart();
	const item = new Item('p1', 10.5);

	const spy1 = sinon.spy();
	const spy3 = sinon.spy();

	cart.addObserver(spy1);
	cart.addObserver(() => {
		throw Error;
	});
	cart.addObserver(spy3);

	cart.add(item);

	t.false(cart.isEmpty());
	t.is(cart.total, item.value);
	t.true(spy1.called);
	t.true(spy1.calledWith(item.name, item.value));
	t.true(spy3.called);
	t.true(spy3.calledWith(item.name, item.value));
});
