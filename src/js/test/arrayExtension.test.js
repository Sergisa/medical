require('../arrayExtension')

let array = [4, 5, 6, 7, 8, 9, 1, 2, 3, 10, 11, 22]
test("Индекс максимального элемента находится", () => {
    expect(array.maxIndex()).toBe(11)
})
test("Максимальный элемент находится", () => {
    expect(array.max()).toBe(22)
})
test("Индекс минимального элемента находится", () => {
    expect(array.minIndex()).toBe(6)
})
test("Минимальный находится", () => {
    expect(array.min()).toBe(1)
})

test("Минимальный находится", () => {
    array = [6,6,6]

    expect(array.min()).toBe(6)
    expect(array.max()).toBe(6)

    expect(array.minIndex()).toBe(0)
    expect(array.maxIndex()).toBe(0)
})
