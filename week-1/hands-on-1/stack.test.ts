import test from 'ava'

import Stack from './stack'

test('empty stack', t => {
    const stack: Stack = new Stack(10)

    t.is(stack.length, 0)
    t.true(stack.isEmpty())
})

test('add element', t => {
    const stack: Stack = new Stack(10)
    stack.push('hello world')

    t.is(stack.length, 1)
    t.false(stack.isEmpty())
    t.is(stack.peek(), 'hello world')
})

test('add two elements and remove one element', t => {
    const stack: Stack = new Stack(10)
    stack.push('first')
    stack.push('second')

    t.is(stack.length, 2)
    t.is(stack.peek(), 'second')

    const element = stack.pop()
    t.is(element, 'second')

    t.is(stack.length, 1)
    t.is(stack.peek(), 'first')
})

test('remove from empty stack', t => {
    const stack: Stack = new Stack(10)
    t.throws(() => stack.pop(), { message: 'Cannot use pop because the stack is empty' })
})

test('add on full stack', t => {
    const stack: Stack = new Stack(10)
    for (let i = 0; i < stack.size; i++) stack.push(`element${i}`)

    t.throws(() => stack.push('boom'), { message: 'Cannot use push because the stack is full' })
})
