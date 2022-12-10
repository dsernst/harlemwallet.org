export const RegistrationForm = () => {
  return (
    <form className="mt-5 space-y-2">
      <label>
        Your Name <input className="border-2" />
      </label>

      <label>
        Your Mailing Address <input className="border-2" />
      </label>

      <label>
        Your Email Address <input className="border-2" />
      </label>

      <a className="block py-1.5 mt-10 bg-cyan-200/75 rounded-sm cursor-pointer hover:bg-cyan-300">
        Submit
      </a>

      <style jsx>{`
        label {
          display: block;
        }
      `}</style>
    </form>
  )
}
