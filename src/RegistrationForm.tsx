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
    <form className="w-full px-4 mt-1 text-left rounded-lg shadow-xl bg-cool-december border-t-4 border-magenta-pink">
      <FormItem label="Your Name" value={name} setter={setName} />

      <FormItem
        label="Your Mailing Address"
        value={mailing_address}
        setter={setMailingAddress}
      />

      <FormItem label="Your Email Address" value={email} setter={setEmail} />

      {/* Register btn */}
      <a
        className="block text-center text-black font-medium font-form tracking-[1px] uppercase py-1.5 my-5 bg-fuchsia-blush rounded-md cursor-pointer border-2 border-fuchsia-blush hover:border-magenta-pink hover:bg-cool-december hover:text-magenta-pink shadow-md active:bg-zinc-600 active:shadow-sm"
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
