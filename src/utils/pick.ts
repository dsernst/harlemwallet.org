type AnyObject = Record<string, any>

export function pick<T extends AnyObject, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const picked: Partial<T> = {}

  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      picked[key] = obj[key]
    }
  })

  return picked as Pick<T, K>
}

// // Example usage
// const obj = {
//   name: 'John Doe',
//   age: 30,
//   email: 'johndoe@example.com',
// }

// const pickedObj = pick(obj, 'name', 'age')
// console.log(pickedObj) // Output: { name: 'John Doe', age: 30 }
