import test from 'ava'

import { Translate } from './translate'

test('no translation', t => {
    const translate = new Translate()

    t.true(translate.isEmpty())
})

test('one translation', t => {
    const translate = new Translate()
    translate.addTranslation('bom', 'good')

    t.false(translate.isEmpty())
    t.is(translate.translate('bom'), 'good')
})

test('two translations', t => {
    const translate = new Translate()
    translate.addTranslation('bom', 'good')
    translate.addTranslation('mau', 'bad')

    t.false(translate.isEmpty())
    t.is(translate.translate('bom'), 'good')
    t.is(translate.translate('mau'), 'bad')
})

test('two translations same word', t => {
    const translate = new Translate()
    translate.addTranslation('bom', 'good')
    translate.addTranslation('bom', 'nice')

    t.false(translate.isEmpty())
    t.is(translate.translate('bom'), 'good, nice')
})

test('phrase', t => {
    const translate = new Translate()
    translate.addTranslation('guerra', 'war')
    translate.addTranslation('é', 'is')
    translate.addTranslation('ruim', 'bad')

    t.is(translate.translatePhrase('guerra é ruim'), 'war is bad')
})

test('phrase with two translations', t => {
    const translate = new Translate()
    translate.addTranslation('guerra', 'war')
    translate.addTranslation('é', 'is')
    translate.addTranslation('ruim', 'bad')
    translate.addTranslation('ruim', 'awful')

    t.is(translate.translatePhrase('guerra é ruim'), 'war is bad')
})
