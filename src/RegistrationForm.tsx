import { useState } from 'react'
import { FormItem } from './FormItem'

export const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form className="w-full px-4 mt-1 text-left rounded-lg shadow-xl bg-orange-50">
      <FormItem label="Your Name" />

      <FormItem label="Your Mailing Address" />

      <FormItem label="Your Email Address" />

      {/* Register btn */}
      <a
        className="block text-center py-1.5 my-5 bg-amber-200/75 rounded-md cursor-pointer font-medium border-amber-400 border hover:bg-amber-300 shadow-md active:bg-amber-400 active:shadow-sm"
        onClick={() => setSubmitted(!submitted)}
      >
        {!submitted ? 'Register' : "Nothing's being saved yet! 🙂"}
      </a>
    </form>
  )
}
