export type Populated<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Exclude<T[P], string | number | null | undefined>
}
