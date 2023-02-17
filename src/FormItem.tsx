export const FormItem = ({
  label,
  value,
  setter,
}: {
  label: string
  value: string
  setter: (v: string) => void
}) => {
  return (
    <label className="block mt-4 text-sm font-medium font-form tracking-[1px] text-zinc-600 uppercase">
      {label}{' '}
      <input
        className="w-full px-1 mt-0.5 text-base font-medium bg-white border-2 border-zinc-600 hover:bg-slate-50 focus:border-magenta-pink focus:ring-0 focus:outline-none"
        {...{ value }}
        onChange={({ target }) => {
          setter(target.value)
        }}
      />
    </label>
  )
}
