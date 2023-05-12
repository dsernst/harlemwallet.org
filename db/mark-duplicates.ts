import { importReviewed } from './import-reviewed'

const reviewed = importReviewed()
console.log(reviewed.length)
console.log(reviewed.slice(0, 3))
