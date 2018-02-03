import { right, left, findColorHexCode, fromNullable, tryCatch, getPort } from "./either";

test("right", () => {
  const result = right(2)
    .map(x => x + 1)
    .map(x => x / 2)
    .fold(_x => "error", x => x);
  expect(result).toBe(1.5)
})

test("left", () => {
  const result = left(2)
    .map(x => x + 1)
    .map(x => x / 2)
    .fold(_x => "error", x => x);
  expect(result).toBe("error")
})

test("fromNullable", () => {
  expect(fromNullable(1).fold(x => "null", x => x)).toBe(1);
  expect(fromNullable(null).fold(x => x, x => "no null")).toBe(null);
})

test("tryCatch", () => {
  const err = Error("x")
  const throwErr = () => { throw err; }
  expect(tryCatch(() => throwErr()).fold(x => x, x => "no error")).toBe(err)
  expect(tryCatch(() => 1).fold(x => "error", x => x)).toBe(1)
})

test("findColorHexCode", () => {
  const positiveResult = findColorHexCode("red").fold(_x => "no color", x => x);
  const negativeResult = findColorHexCode("redd").fold(_x => "no color", x => x);  
  expect(positiveResult).toBe("FF4444");
  expect(negativeResult).toBe("no color");
})

test("getPort", () => {
  expect(getPort()).toBe(8888)
  expect(getPort("foo.json")).toBe(3000)
})