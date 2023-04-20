/**  This function takes an array of type T and a key of type keyof T (which means that the key must be a property of type T). It returns an object where each key is a string representation of the value of the specified property (key) of each item in the array, and the corresponding value is the item itself. */
export function keyBy<T>(array: T[], key: keyof T): { [key: string]: T } {
  return array.reduce((result, item) => {
    result[String(item[key])] = item
    return result
  }, {} as { [key: string]: T })
}

// // Example
// interface Person {
//   id: number
//   name: string
// }

// const people: Person[] = [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' },
// ]

// const peopleById = keyBy(people, 'id')

// console.log(peopleById)
/*
Output:
{
  "1": { id: 1, name: "Alice" },
  "2": { id: 2, name: "Bob" },
  "3": { id: 3, name: "Charlie" },
}
*/
