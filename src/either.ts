import { readFileSync } from "fs";
import { join } from "path";

export type Either<R, L> = {
  chain: <R2, L2>(f: (x: R) => Either<R2, L2>) => Either<R2, L | L2>
  map: <R2>(f: (x: R) => R2) => Either<R2, L>
  fold: <L2,R2>(f: (x: L) => L2, g: (x: R) => R2) => L2 | R2
  inspect: () => string
}


export const right =
  <R, L = any>(x: R): Either<R, L> => ({
    chain: <R2, L2>(f: (x: R) => Either<R2, L2>) => f(x),
    map: <R2>(f: (x: R) => R2) => right(f(x)),
    fold: <L2,R2>(_f: (x: L) => L2, g: (x: R) => R2) => g(x),
    inspect: () => `Right(${x})`
  })

export const left =
  <L, R = any>(x: L) => ({
    chain: <R2, L2>(_f: (x: R) => Either<R2, L2>) => left(x),
    map: <R2>(_f: (x: R) => R2) => left(x),
    fold: <L2,R2>(f: (x: L) => L2, _g: (x: R) => R2) => f(x),
    inspect: () => `Left(${x})`
  })


export const fromNullable = 
  <R>(x: R | null): Either<R, null> => 
    x != null ? right(x) : left(null)

export const tryCatch =
  <T, Err = Error>(fn: () => T): Either<T, Err> => {
    try { 
      return right(fn())
    } catch(e) { 
      return left(e)
    }
  }

const colors: { [colorName: string]: string } = { 
  red: "#ff4444",
  blue: "3b5998",
  yellow: "#fff68f",
}

export const findColorHexCode =
  (colorName: string): Either<string, null> => 
    fromNullable(colors[colorName])
    .map(s => s.substr(1))
    .map(s => s.toUpperCase())

interface FileError extends Error { }
interface JSONError extends Error { }

export const getPort =
  (fileName: string = "config.json"): number =>
    tryCatch<string, FileError>(() => readFileSync(join(__dirname, fileName), "utf-8"))
    .chain(s => tryCatch<{ port: number }, JSONError>(() => JSON.parse(s)))
    .fold(
      _err => 3000,
      x => x.port)