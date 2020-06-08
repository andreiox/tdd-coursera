class Stack {
    size: number
    length: number
    private elements: any[]

    constructor(size: number) {
        this.size = size
        this.length = 0
        this.elements = []
    }

    isEmpty(): boolean {
        return this.length === 0
    }

    push(element: any) {
        if (this.length === this.size) throw new Error('Cannot use push because the stack is full')

        this.elements[this.length] = element
        this.length++
    }

    pop(): any {
        if (this.isEmpty()) throw new Error('Cannot use pop because the stack is empty')

        this.length--
        return this.elements[this.length]
    }

    peek(): any {
        return this.elements[this.length - 1]
    }
}

export default Stack
