import { useEffect, useState } from 'react'
import { FormItem } from './FormItem'
import { Spinner } from './Spinner'

export const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [mailing_address, setMailingAddress] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (submitted) setSubmitted(false)
  }, [name, mailing_address, email])

  return (
    <form className="w-full px-4 mt-1 text-left rounded-lg shadow-xl bg-orange-50">
      <FormItem label="Your Name" value={name} setter={setName} />

      <FormItem
        label="Your Mailing Address"
        value={mailing_address}
        setter={setMailingAddress}
      />

      <FormItem label="Your Email Address" value={email} setter={setEmail} />

      {/* Register btn */}
      <a
        className="block text-center py-1.5 my-5 bg-amber-200/75 rounded-md cursor-pointer font-medium border-amber-400 border hover:bg-amber-300 shadow-md active:bg-amber-400 active:shadow-sm"
        onClick={async () => {
          setSubmitting(true)
          await fetch('/api/register', {
            body: JSON.stringify({ name, mailing_address, email }),
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          setSubmitting(false)
          setSubmitted(true)
        }}
      >
        {submitting ? (
          <>
            <Spinner /> Saving...
          </>
        ) : !submitted ? (
          'Register'
        ) : (
          'Registered! 🎉'
        )}
      </a>
    </form>
  )
}
