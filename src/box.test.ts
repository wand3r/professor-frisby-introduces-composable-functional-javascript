import {
  nextCharForNumberString,
  moneyToFloat,
  percentToFloat,
  applyDiscount,
} from "./box"

test("nextCharForNumberString", () => {
  expect(nextCharForNumberString("  64 ")).toBe("A")
})

test("moneyToFloat", () => {
  expect(moneyToFloat("40$").fold((x) => x)).toBe(40)
})

test("percentToFloat", () => {
  expect(percentToFloat("20%").fold((x) => x)).toBe(0.2)
})

test("applyDiscount", () => {
  expect(applyDiscount("100$", "20%")).toBe(80)
})
