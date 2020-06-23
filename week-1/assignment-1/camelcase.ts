export default function camelcase(str: string): string[] {
    validateString(str)

    str = str.replace(/([A-Z]{1}[a-z]{1})/g, (txt: string) => ` ${txt.toLowerCase()}`)
    str = str.replace(/([a-z]{1}([A-Z]{1}|[0-9]{1}))/g, (txt: string) => `${txt.charAt(0)} ${txt.charAt(1)}`)

    return str.trim().split(' ')
}

function validateString(str: string): void {
    if (/^[0-9]/.test(str)) throw new Error('Error: word cannot start with number')
    if (/\W/g.test(str)) throw new Error('Error: word cannot have special symbols')
}
