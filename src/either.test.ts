import { right, left, findColorHexCode } from "./either";

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

test("findColorHexCode", () => {
  const positiveResult = findColorHexCode("red").fold(_x => "no color", x => x);
  const negativeResult = findColorHexCode("redd").fold(_x => "no color", x => x);  
  expect(positiveResult).toBe("FF4444");
  expect(negativeResult).toBe("no color");
})