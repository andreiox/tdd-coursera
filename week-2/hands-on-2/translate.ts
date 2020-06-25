export class Translate {
    translations: { [key: string]: string[] }

    constructor() {
        this.translations = {}
    }

    isEmpty(): boolean {
        return Object.keys(this.translations).length === 0
    }

    addTranslation(word: string, translation: string): void {
        if (!this.translations[word]) this.translations[word] = []

        this.translations[word].push(translation)
    }

    translate(word: string): string {
        return this.translations[word].join(', ')
    }

    translatePhrase(phrase: string): string {
        const words = phrase.split(' ')
        return words.map(word => this.translations[word][0]).join(' ')
    }
}
