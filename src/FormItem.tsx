export const FormItem = ({ label }: { label: string }) => {
  return (
    <label className="block mt-4 text-xs font-medium text-black/80">
      {label}{' '}
      <input className="w-full px-1 mt-0.5 text-base font-medium bg-white border-2 border-orange-700/25 focus:border-white/0 focus:ring-0" />
    </label>
  )
}
