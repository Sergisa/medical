/**
 * @jest-environment node
 * @transformIgnorePatterns: ['node_modules/'],
 */
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
    array = [6, 6, 6]

    expect(array.min()).toBe(6)
    expect(array.max()).toBe(6)

    expect(array.minIndex()).toBe(0)
    expect(array.maxIndex()).toBe(0)
})
test("Выборка уникального набора", () => {
    expect([1, 4, 5, 5, 5, 7].getUnique()).toStrictEqual([1, 4, 5, 7])
})
test("Оставляет строки не тронутыми считая их числами", () => {
    expect([1, "4", 5, 5, 5, 7].getUnique()).toStrictEqual([1, "4", 5, 7])
})
test("Строки это не числа", () => {
    expect([1, 4, "5", 5, 5, 7].getUnique()).toStrictEqual([1, 4, "5", 5, 7])
})
test("Очищает null, undefined и \"\"", () => {
    expect([1, 4, null, null, 5, 5, 7].getUnique()).toStrictEqual([1, 4, 5, 7])
    expect([1, 4, undefined, undefined, 5, 5, 7].getUnique()).toStrictEqual([1, 4, 5, 7])
})
test("Concat test", () => {
    expect([].concat([5, 4]).concat([5]).concat([4, 3]).concat([1]).getUnique()).toStrictEqual([5, 4, 3, 1])
    expect([1, 4, undefined, undefined, 5, 5, 7].getUnique()).toStrictEqual([1, 4, 5, 7])
})
