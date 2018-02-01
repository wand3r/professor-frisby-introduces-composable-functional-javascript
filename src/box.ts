export type Box<T> = {
  map: <R>(f: (x: T) => R) => Box<R>
  fold: <R>(f: (x: T) => R) => R
  inspect: () => string
}

export const box: <T>(x: T) => Box<T> = <T>(x: T) => ({
  map: <R>(f: (x: T) => R) => box(f(x)),
  fold: <R>(f: (x: T) => R) => f(x),
  inspect: () => `Box${x}`,
})

export const nextCharForNumberString: (str: string) => string = 
  (str) =>
    box(str.trim())
    .map((s) => parseInt(s))
    .map((n) => n + 1)
    .fold((n) => String.fromCharCode(n))

export const moneyToFloat: (str: string) => Box<number> =
  (str) =>
    box(str.replace(/\$/g, ""))
    .map((s) => parseFloat(s))

export const percentToFloat: (str: string) => Box<number> = 
  (str) =>
    box(str.replace(/\%/g, ""))
    .map((s) => parseFloat(s))
    .map((n) => n * 0.01)

export const applyDiscount: (price: string, discount: string) => number = 
  (price, discount) =>
    moneyToFloat(price)
    .fold((price) =>
      percentToFloat(discount)
      .fold((discount) => price * (1 - discount)),
    )
