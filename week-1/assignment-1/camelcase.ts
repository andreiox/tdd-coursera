export default function camelcase(str: string): string[] {
    if (/^[0-9]/.test(str)) throw new Error('Error: word cannot start with number')
    if (/\W/g.test(str)) throw new Error('Error: word cannot have special symbols')

    const regexWordStart = /([A-Z]{1}[a-z]{1})/g
    const regexWordEnd = /([a-z]{1}([A-Z]{1}|[0-9]{1}))/g

    str = str.replace(regexWordStart, (txt: string) => ` ${txt.toLowerCase()}`)
    str = str.replace(regexWordEnd, (txt: string) => `${txt.charAt(0)} ${txt.charAt(1)}`)

    return str.trim().split(' ')
}

