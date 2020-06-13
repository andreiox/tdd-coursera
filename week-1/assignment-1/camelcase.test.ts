import test from 'ava'

import camelcase from './camelcase'

test('convert camelcase - one word', t => {
    const list = camelcase('nome')

    t.deepEqual(list, ['nome'])
})

test('convert camelcase - one word lowercase', t => {
    const list = camelcase('Nome')

    t.deepEqual(list, ['nome'])
})

test('convert camelcase - two words', t => {
    const list = camelcase('nomeComposto')

    t.deepEqual(list, ['nome', 'composto'])
})

test('convert camelcase - two words starting with uppercase', t => {
    const list = camelcase('NomeComposto')

    t.deepEqual(list, ['nome', 'composto'])
})

test('convert camelcase - all uppercase word', t => {
    const list = camelcase('CPF')

    t.deepEqual(list, ['CPF'])
})

test('convert camelcase - word + all uppercase word', t => {
    const list = camelcase('numeroCPF')

    t.deepEqual(list, ['numero', 'CPF'])
})

test('convert camelcase - word + all uppercase word + word', t => {
    const list = camelcase('numeroCPFContribuinte')

    t.deepEqual(list, ['numero', 'CPF', 'contribuinte'])
})

test('convert camelcase - word + numbers + word', t => {
    const list = camelcase('recupera10Primeiros')

    t.deepEqual(list, ['recupera', '10', 'primeiros'])
})

test('convert camelcase - error start with number', t => {
    t.throws(() => camelcase('10Primeiros'), { message: 'Error: word cannot start with number' })
})

test('convert camelcase - error string with symbols', t => {
    t.throws(() => camelcase('nome#Composto'), { message: 'Error: word cannot have special symbols' })
})
