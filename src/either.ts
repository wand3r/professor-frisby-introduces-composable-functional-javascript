export type Either<R, L> = {
  map: <R2>(f: (x: R) => R2) => Either<R2, L>
  fold: <L2,R2>(f: (x: L) => L2, g: (x: R) => R2) => L2 | R2
  inspect: () => string
}


export const right: <R, L>(x: R) => Either<R, L> =
  <R, L = any>(x: R) => ({
    map: <R2>(f: (x: R) => R2) => right(f(x)),
    fold: <L2,R2>(_f: (x: L) => L2, g: (x: R) => R2) => g(x),
    inspect: () => `Right(${x})`
  })

export const left =
  <L, R = any>(x: L) => ({
    map: <R2>(_f: (x: R) => R2) => left(x),
    fold: <L2,R2>(f: (x: L) => L2, _g: (x: R) => R2) => f(x),
    inspect: () => `Left(${x})`
  })


const fromNullable: <R>(x: R) => Either<R, null> = 
  <R>(x: R) => 
    x != null ? right(x) : left(null)

const colors: { [colorName: string]: string } = { 
  red: "#ff4444",
  blue: "3b5998",
  yellow: "#fff68f",
}

export const findColorHexCode: (colorName: string) => Either<string, null> =
  (colorName) => 
    fromNullable(colors[colorName])
    .map(s => s.substr(1))
    .map(s => s.toUpperCase())


