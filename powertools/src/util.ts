export const toCmdParam = (obj: object | null) =>
  obj
    ? Object.keys(obj).reduce((acc, key) => acc + ` --${key} "${obj[key]}"`, '')
    : ''
